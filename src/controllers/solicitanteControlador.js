const Solicitante = require('../models/solicitanteModel');
const supabase = require('../config/supabase')

/*listar todos los solicitantes 
*********************************************************************************************** */
const obtenerSolicitantes = async (req,res)=>{
    try {
        const solicitantes = await Solicitante.getAll();
        res.status(200).json(solicitantes);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


/*
creacion de un solicitante
validar el indice global y el de periodo
*********************************************************************************************** */
const ingresarSolicitante = async (req,res) => {
    const solicitanteData = req.body;
    const file = req.file;


    // validaciones para asegurar que el solicitante está ingresando un promedio válido
    const errors = [];
    const {indiceglobal, indiceperiodo, dni, nocuenta, correoinstitucional, primernombre, primerapellido} = solicitanteData;


    if (indiceglobal>100 || indiceglobal < 0) errors.push('El índice global debe estar entre 0 y 100');
    if (indiceperiodo>100 || indiceperiodo < 0) errors.push('El índice de periodo debe estar entre 0 y 100');
    if (!dni || !dni.trim()) errors.push('El campo dni no debe estar vacío');
    if (!nocuenta || !nocuenta.trim()) errors.push('El campo número de cuenta no debe estar vacío');
    if (!correoinstitucional || !correoinstitucional.trim()) errors.push('El campo correo institucional no debe estar vacío');
    if (!primernombre || !primernombre.trim()) errors.push('El campo primer nombre no debe estar vacío');
    if (!primerapellido || !primerapellido.trim()) errors.push('El campo primer apellido no debe estar vacío');

    // retornar errores de validación si los hay
    if (errors.length > 0){
        return res.status(400).json(errors)
    }
    try {
        /* cargar archivo requisitos a la base de datos y obtener su url
        --------------------------------------------------------------------------*/
        const fileurl = await cargarArchivo(file, solicitanteData.dni);
        solicitanteData['archivorequisitos'] = fileurl;
        // console.log(solicitanteData)

        /* insertar el solicitante a la base de datos
        ------------------------------------------------------------------------- */
        const solicitanteIngresado = await Solicitante.create(solicitanteData);
        res.status(200).json(solicitanteIngresado);

    } catch (error) {
        res.json({error:error.message})
    }
    

}






//Buscar solicitante por número de cuenta 
const obtenerSolicitanteByNoCuenta = async (req,res) => {
    const {id} = req.params;
    const noCuenta = id;
    try {
        const solicitanteEncontrado = await Solicitante.findByNoCuenta(noCuenta);
        res.status(200).json(solicitanteEncontrado);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}





/* Función para cargar el arachivo requisitos a la base de datos
 *****************************************************************************************************************************+*/
const cargarArchivo = async (file, dni)=>{
    //validando que haya un archivo
    if(!file) throw new Error('No se ha selecionado ningún archivo');
    //validando que sea un archivo de tipo pdf
    if (!(file.mimetype === 'application/pdf')) throw new Error('El archivo debe ser un pdf')
    
    // obtener la fecha para definir el nombre del archivo
    const fecha = (new Date(Date.now()));
    const f = `${fecha.getFullYear()}_${fecha.getMonth()}_${fecha.getDate()}_h${fecha.getHours()}m${fecha.getMinutes()}s${fecha.getSeconds()}`
    
    
    // ruta y nombre del archivo a guardar en la base de datos
    const filePath = `requisitos/${f}_${dni}_requisitos_beca.pdf`;
    

    // carga del archivo a la base de datos
    const {error} = await supabase
    .storage
    //nombre del bucket
    .from('pdf-public')
    .upload(filePath,file.buffer,{contentType:'application/pdf'})
    

    // verificación de la ocurrencia de algún error
    if (error) throw new Error(`Ocurrio un error al subir el archivo: ${error.message}`);


    // obtención de la url del archivo subido
    const {data} = await supabase
    .storage
    .from('pdf-public')
    .getPublicUrl(filePath);


    return data.publicUrl;
}



module.exports = {
    ingresarSolicitante,
    obtenerSolicitantes,
    obtenerSolicitanteByNoCuenta
}
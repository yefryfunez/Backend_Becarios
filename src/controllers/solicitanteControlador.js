const Solicitante = require('../models/solicitanteModel');
const archvio = require('../models/archivoModel');
const ArchivoModel = require('../models/archivoModel');

/*listar todos los solicitantes 
*********************************************************************************************** */
const obtenerSolicitantes = async (req,res)=>{
    try {
        const solicitantes = await Solicitante.obtenerSolicitantes();
        res.status(200).json(solicitantes);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


/*
creacion de un solicitante
*********************************************************************************************** */
const ingresarSolicitante = async (req,res) => {
    const solicitanteData = req.body;
    const file = req.file;


    // // validaciones para asegurar que el solicitante está ingresando un promedio válido
    // const errors = [];
    // const {indiceglobal, indiceperiodo, dni, nocuenta, correoinstitucional, primernombre, primerapellido} = solicitanteData;


    // if (indiceglobal>100 || indiceglobal < 0) errors.push('El índice global debe estar entre 0 y 100');
    // if (indiceperiodo>100 || indiceperiodo < 0) errors.push('El índice de periodo debe estar entre 0 y 100');
    // if (!dni || !dni.trim()) errors.push('El campo dni no debe estar vacío');
    // if (!nocuenta || !nocuenta.trim()) errors.push('El campo número de cuenta no debe estar vacío');
    // if (!correoinstitucional || !correoinstitucional.trim()) errors.push('El campo correo institucional no debe estar vacío');
    // if (!primernombre || !primernombre.trim()) errors.push('El campo primer nombre no debe estar vacío');
    // if (!primerapellido || !primerapellido.trim()) errors.push('El campo primer apellido no debe estar vacío');

    // // retornar errores de validación si los hay
    // if (errors.length > 0){
    //     return res.status(400).json(errors)
    // }



    try {
        // obtener la fecha para definir el nombre del archivo
        const fecha = (new Date(Date.now()));
        const f = `${fecha.getFullYear()}_${fecha.getMonth()}`
        const filePath = `requisitos_becas/${f}_${solicitanteData.dni}_requisitos_beca.pdf`;


        /* cargar archivo requisitos a la base de datos y obtener su url
        --------------------------------------------------------------------------*/
        const fileurl = await ArchivoModel.cargarDocumentoPdf(file,filePath);
        solicitanteData['archivorequisitos'] = fileurl;


        /* insertar el solicitante a la base de datos
        ------------------------------------------------------------------------- */
        const respuesta = await Solicitante.ingresarSolicitante(solicitanteData);
        console.log(respuesta)
        res.status(200).json({mensaje:respuesta});

    } catch (error) {
        res.status(500).json({error:error.message});
    }
    

}







module.exports = {
    ingresarSolicitante,
    obtenerSolicitantes
}
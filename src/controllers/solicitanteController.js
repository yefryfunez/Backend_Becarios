const Solicitante = require('../models/solicitante');
const Requisito = require('../models/cargarRequisitos');


//listar todos los solicitantes
const getSolicitantes = async (req,res)=>{
    try {
        const solicitantes = await Solicitante.getAll();
        res.status(200).json(solicitantes);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}



//creacion de un solicitante
//validar el indice global y el de periodo
const createSolicitante = async (req,res) => {
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
        const fileurl = await Requisito.loadFile(file, solicitanteData.dni);
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
const findSolicitanteByNoCuenta = async (req,res) => {
    const {id} = req.params;
    const noCuenta = id;
    try {
        const solicitanteEncontrado = await Solicitante.findByNoCuenta(noCuenta);
        res.status(200).json(solicitanteEncontrado);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}






// Actualizar información del Solicitante
const updateSolicitante = async(req, res) => {
    const {id} = req.params;
    const solicitanteData = req.body;


    // validaciones para asegurar que el solicitante está ingresando un promedio válido
    const errors = [];
    const {indiceglobal, indiceperiodo, dni, nocuenta, correoinstitucional} = solicitanteData;

    if (indiceglobal>100 || indiceglobal < 0) errors.push('El índice global debe estar entre 0 y 100');
    if (indiceperiodo>100 || indiceperiodo < 0) errors.push('El índice de periodo debe estar entre 0 y 100');
    if (!dni.trim()) errors.push('El campo dni no debe estar vacío');
    if (!nocuenta.trim()) errors.push('El campo número de cuenta no debe estar vacío');
    if (!correoinstitucional.trim()) errors.push('El campo correo institucional no debe estar vacío');
    if (!solicitanteData.primernombre.trim()) errors.push('El campo primer nombre no debe estar vacío');
    if (!solicitanteData.primerapellido.trim()) errors.push('El campo primer apellido no debe estar vacío');

    // retornar errores de validación si los hay
    if (errors.length > 0){
        return res.status(400).json(errors)
    }


    try {
        await Solicitante.update(id,solicitanteData);
        res.status(200).json({message:'solicitante actualizado'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}





/* Eliminar solicitante
*****************************************************************************************************************/
const deleteSolicitante = async(req,res) => {
    const {id} = req.params;
    try {
        const solicitanteEliminado = await Solicitante.delete(id);
        res.status(200).json(solicitanteEliminado);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


module.exports = {
    createSolicitante,
    getSolicitantes,
    updateSolicitante,
    deleteSolicitante,
    findSolicitanteByNoCuenta
}
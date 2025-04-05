const Solicitante = require('../models/solicitanteModel');
const ArchivoModel = require('../models/archivoModel');
const SolicitanteModel = require('../models/solicitanteModel');

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
        res.status(200).json({mensaje:respuesta});

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


const obtenerSolicitante = async(req,res) => {
    const idsolicitante = req.params;
    try {
        const respuesta = await SolicitanteModel.obtenerSolicitante(idsolicitante);
        res.status(200).json(respuesta);
    } catch (error) {
        res.json({message:error});
    }
}


module.exports = {
    ingresarSolicitante,
    obtenerSolicitantes,
    obtenerSolicitante
}
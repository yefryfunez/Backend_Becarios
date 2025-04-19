const ArchivoModel = require('../models/archivoModel');
const PublicacionModel = require('../models/publicacionModel');


/*registro de una publicación  en la bae de datos
*********************************************************************************************** */
const ingresarPublicacion = async (req,res) =>{
    const publicacion = req.body;
    const idempleado = req.usuario.idempleado;
    try {
        
        // obtener la fecha para definir el nombre del archivo
        const fecha = (new Date(Date.now()));
        const f = `${fecha.getFullYear()}_${fecha.getMonth()}`
        const filePath = `publicaciones/${req.body.tipopublicacion}_${f}.pdf`;


        /* cargar archivo requisitos a la base de datos y obtener su url
        --------------------------------------------------------------------------*/
        const urlfile = await ArchivoModel.cargarDocumentoPdf(req.file,filePath);
        publicacion.urlfile = urlfile;
        publicacion.idempleado=idempleado;

        // insertar publicacion en la base de datos
        const respuesta = await PublicacionModel.ingresarPublicacion(publicacion);
        res.status(200).json({respuesta});
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}


/*listar todas la publicaciones
*********************************************************************************************** */
const obtenerPublicaciones = async (req,res) => {
    try {
        const publicaciones = await PublicacionModel.obtenerPublicaciones();
        res.status(200).json(publicaciones);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}



module.exports = {
    ingresarPublicacion,
    obtenerPublicaciones
}
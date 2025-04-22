
const NotificacionModel = require('../models/notificacionModel');

const ingresarNotificacion = async(req,res)=>{
    const {titulomensaje, cuerpomensaje} = req.body;
    const {idempleado} = req.usuario;
    try {
        const respuesta = await NotificacionModel.ingresarNotificacion({
            idempleado:idempleado,
            titulomensaje:titulomensaje,
            cuerpomensaje:cuerpomensaje
        })
        res.status(200).json({respuesta});
    } catch (error) {
        res.json({error:error.message})
    }
}

    
/**
 * Obtener todas las notificaciones
 */
const obtenerNotificaciones = async (req, res) => {
    try {
        const notificaciones = await NotificacionModel.obtenerNotificaciones();
        res.status(200).json(notificaciones);  
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
};

module.exports = {
    ingresarNotificacion,
    obtenerNotificaciones
}
const NotificacionModel = require('../models/notificacionModel');

const ingresarNotificacion = async(req,res)=>{
    const {idempleado, titulomensaje, cuerpomensaje} = req.body;
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

module.exports = {
    ingresarNotificacion
}
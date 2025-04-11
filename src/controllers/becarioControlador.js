const BecarioModel = require('../models/becarioModel');

const inscribirActividad = async (req,res)=>{
    const {idactividad,idbecario} = req.body;
    try {
        const respuesta = await BecarioModel.inscribirActividad({idactividad:idactividad,idbecario:idbecario});
        res.status(200).json({message:respuesta});
    } catch (error) {
        res.json({error:error.message})
    }
}


module.exports = {
    inscribirActividad
}
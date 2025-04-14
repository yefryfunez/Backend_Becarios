const BecarioModel = require('../models/becarioModel');



const miPerfil = async (req,res)=>{
    const idbecario = 7;
    try {
        const respuesta = await BecarioModel.miPerfil(idbecario);
        res.status(200).json({respuesta:respuesta});
    } catch (error) {
        res.json({error:error.message})
    }
}

module.exports = {
    miPerfil
}
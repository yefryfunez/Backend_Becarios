

const BecarioModel = require('../models/becarioModel');



const miPerfil = async (req,res)=>{
    
    const idbecario = req.usuario.idbecario;
    if(!idbecario) return res.status(404).json({error:'Mi perfil - Id becario no especificado.'})
    try {
        const respuesta = await BecarioModel.miPerfil(idbecario);
        
        res.status(200).json({respuesta});
    } catch (error) {
        res.json({error:error.message})
    }
    
}

module.exports = {
    miPerfil
}
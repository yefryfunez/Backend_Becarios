

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
const obtenerBecarios = async(req, res)=> {
    const {idbeca} = req.params;
    let respuesta = null;
    try {
        if (!idbeca){
            respuesta = await BecarioModel.obtenerBecarios();
        }else{
            respuesta = await BecarioModel.obtenerBecarios(idbeca);
        }
        res.status(200).json({respuesta});
    } catch (error) {
        res.json({error:error.message})
    }
}
const obtenerBecario = async(req, res)=> {
    const {nocuenta} = req.params;
    if (!nocuenta) res.json({error:'EL campo número de cuenta está vacío.'})
    let respuesta = null;
    try {
        respuesta = await BecarioModel.obtenerBecario(nocuenta);
        res.status(200).json({respuesta});
    } catch (error) {
        res.json({error:error.message})
    }
}

module.exports = {
    miPerfil,
    obtenerBecarios,
    obtenerBecario
}
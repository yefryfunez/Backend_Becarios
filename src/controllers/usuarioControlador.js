const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuarioModel');
const BecarioModel = require('../models/becarioModel');
const EmpleadoModel = require('../models/empleadoModel');

const buscarCorreo = async(req,res)=>{
    const {correo} = req.body;
    if(!correo) return res.status(404).json('No se ha ingresado ningún correo.')
    try {
        const respuesta = await UsuarioModel();
        res.json(respuesta);
    } catch (error) {
        return res.json({error:error.message})
    }
}

const login = async (req,res)=>{
    const {email,password} = req.body
    let token = null;
    try {
        const {idusuario,idrol} = await UsuarioModel.login(email,password);
        if (idrol===1){
            const {idbecario} = await BecarioModel.getIdBecario(idusuario);
            token = jwt.sign(
                {idusuario, idrol, idbecario},
                process.env.SUPABASE_JWT_SECRET,
                { expiresIn: '1h' }
            );
        }else if (idrol===2){
            const {idempleado} = await EmpleadoModel.getIdEmpleado(idusuario);
            token = jwt.sign(
                {idusuario, idrol, idempleado},
                process.env.SUPABASE_JWT_SECRET,
                { expiresIn: '1h' }
            );
        }else{
            return res.json({error:'Rol no encontrado'})
        }
        res.json({token})
    } catch (error) {
        res.json({error:error.message})
    }
    
}

module.exports = {
    buscarCorreo,
    login
}
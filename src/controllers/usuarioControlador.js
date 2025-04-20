const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuarioModel');
const BecarioModel = require('../models/becarioModel');
const EmpleadoModel = require('../models/empleadoModel');
const {Correo,transporter} = require('../models/correoModel');
require('dotenv').config();

const restablecerContrasenia = async(req,res)=>{
    let respuesta = false;
    const {codigo, correo, contraseniaNueva} = await req.body;
    if(!codigo) return res.status(400).json('Debes enviar el código de verificación');
    if(!contraseniaNueva) return res.status(400).json('La contraseña nueva no puede ser vacía.');
    if(!correo) return res.status(400).json('Correo no ingresado');
    try {
        
        if (contraseniaNueva.length<6) throw new Error('La contraseña debería tener almenos 6 caracteres.')
        // buscar el correo en la base de datos
        const idusuario = await UsuarioModel.buscarCorreo(correo);
        
        if (!idusuario){
            throw new Error('No se ha encontrado el correo especificado.');;
        }
        
        // verificar codigo y establecerlo como utilizado
        respuesta = await UsuarioModel.utilizarCodigo(idusuario,codigo);
        if (respuesta){
            const response = await UsuarioModel.cambiarContrasenia(idusuario,contraseniaNueva)
            res.status(200).json({respuesta:{message:'Contraseña actualizada exitosamente'},});
        }else {
            res.status(400).json({respuesta:{message:'El código es inválido o ha expirado.'},valido:false});
        }
    } catch (error) {
        res.status(400).json({error:error.message});
    }
    
}


const verificarCodigo = async(req,res)=>{
    let respuesta = false;
    const {codigo, correo} = await req.body;
    if(!codigo) return res.status(400).json('Debes enviar el código de verificación');
    if(!correo) return res.status(400).json('Debes ingresar un correo');
    try {
        // buscar el correo en la base de datos
        const idusuario = await UsuarioModel.buscarCorreo(correo);
        if (!idusuario){
            throw new Error('No se ha encontrado el correo especificado.');;
        }
        respuesta = await UsuarioModel.verificarCodigo(idusuario,codigo);
        if (respuesta){
            res.status(200).json({respuesta:{message:'El codigo es válido'},valido:true});
        }else {
            res.status(400).json({respuesta:{message:'El código es inválido o ha expirado.'},valido:respuesta});
        }
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}


const ingresarCorreo = async(req,res)=>{
    let respuesta = false;
    const {correo} = req.body;
    if(!correo) return res.status(400).json('Debes ingresar un correo');
    try {
        // buscar el correo en la base de datos
        const idusuario = await UsuarioModel.buscarCorreo(correo);
        if (!idusuario){
            throw new Error('No se ha encontrado el correo especificado.');
        }
        
        // generar el codigo
        const codigo = Math.floor(100000 + Math.random() * 900000).toString();

        // guardar el código en la base de datos
        respuesta = await UsuarioModel.guardarCodigo(idusuario,codigo);
        
        if (respuesta){
            // enviar código al correo del usuario
            const mail = new Correo();
            // mail.setPara(correo)
            mail.setPara(`${process.env.CORREO_RECUPERACION}`);
            mail.setAsunto('Recuperación de contraseña');
            mail.setMensaje(`
            Reciba un cordial saludo estimado usuario se ha hecho una solicitud para cambiar la contraseña del usuario ${correo}.
            Este es su código de verificación para recuperar su contraseña: ${codigo}. Expira en 15 minutos;
            En caso de una equivocación ignore este mensaje.
            `)
            transporter.sendMail(mail.mailOptions,(err,info)=>{
                if (err) return res.json({error:err.message});
            })
        } else{
            return res.status(400).json({error:error.message});
        }
        res.status(200).json({respuesta:`Se ha enviado un código de recuperación al correo: ${correo}`});
    } catch (error) {
        res.status(400).json({error:error.message});
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
        res.status(400).json({token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}

module.exports = {
    ingresarCorreo,
    login,
    verificarCodigo,
    restablecerContrasenia
}
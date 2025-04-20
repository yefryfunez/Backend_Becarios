const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuarioModel');
const BecarioModel = require('../models/becarioModel');
const EmpleadoModel = require('../models/empleadoModel');
const {Correo,transporter} = require('../models/correoModel');


const verificarCodigo = async(req,res)=>{
    const {codigo, correo} = await req.body;
    try {
        // buscar el correo en la base de datos
        const idusuario = await UsuarioModel.buscarCorreo(correo);
        if (!idusuario){
            throw new Error('No se ha encontrado el correo especificado.');
        }
        
        res.status(200).json('hola')
    } catch (error) {
        res.json({error:error.message});        
    }
}


const ingresarCorreo = async(req,res)=>{
    let respuesta = false;
    const {correo} = req.body;
    try {
        // buscar el correo en la base de datos
        const idusuario = await UsuarioModel.buscarCorreo(correo);
        if (!idusuario){
            throw new Error('No se ha encontrado el correo especificado.');
        }
        
        // generar el codigo
        const codigo = Math.floor(100000 + Math.random() * 900000).toString();
        // fecha y hora de expiración del cógido (10 minutos en este caso)
        const expira_en = new Date(Date.now() + 10 * 60 * 1000); 

        // guardar el código en la base de datos
        respuesta = await UsuarioModel.guardarCodigo(idusuario,codigo,expira_en);
        
        if (respuesta){
            // enviar código al correo del usuario
            const mail = new Correo();
            mail.setPara('yadirvasquezx2@gmail.com')
            mail.setAsunto('Recuperación de contraseña');
            mail.setMensaje(`
            Reciba un cordial saludo estimado usuario se ha hecho una solicitud para cambiar la contraseña del usuario ${correo}.
            Este es su código de verificación para recuperar su contraseña: ${codigo}.
            En caso de una equivocación ignore este mensaje.
            `)
            transporter.sendMail(mail.mailOptions,(err,info)=>{
                if (err) return res.json({error:err.message});
            })
        } else{
            return res.json({error:error.message});
        }
        res.status(200).json({respuesta:`Se ha enviado un código de recuperación al correo: ${correo}`});
    } catch (error) {
        res.json({error:error.message});
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
    ingresarCorreo,
    login,
    verificarCodigo
}
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuarioModel');
const BecarioModel = require('../models/becarioModel');
const EmpleadoModel = require('../models/empleadoModel');
const {Correo,transporter} = require('../models/correoModel');




const enviarCodigo = async(req,res)=>{
    const {correo} = req.body;
    try {
        // buscar el correo en la base de datos
        const _correo = await UsuarioModel.buscarCorreo(correo);
        if (!_correo){
            throw new Error('No se ha encontrado el correo especificado.');
        }
        
        // generar el codigo
        const codigo = generarCodigo();
        


        const mail = new Correo();

        mail.setPara('yadirvasquezx2@gmail.com')
        mail.setAsunto('Recuperación de contraseña');
        mail.setMensaje(`
        Reciba un cordial saludo estimado usuario se ha hecho una solicitud para cambiar la contraseña del usuario ${_correo}.
        Este es su código de verificación para recuperar su contraseña: ${codigo}.
        En caso de una equivocación ignore este mensaje.
        `)
        transporter.sendMail(mail.mailOptions,(err,info)=>{
            if (err) return res.json({error:err.message});
        })
        res.status(200).json({codigo});
    } catch (error) {
        res.json({error:error.message});
    }

}

function generarCodigo(){
    let contrasenia = '';
    const longitud_contrasenia = 6;
    const caracteres = '0123456789';
    for (let i=0;i<longitud_contrasenia;i++){
        contrasenia+=caracteres[Math.floor(Math.random()*caracteres.length)]
    }
    return contrasenia;
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
    enviarCodigo,
    login
}
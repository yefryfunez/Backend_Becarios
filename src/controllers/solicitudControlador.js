const BecarioModel = require('../models/becarioModel');
const SolicitanteModel = require('../models/solicitanteModel');
const SolicitudModel = require('../models/solicitudModel');
const UsuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const {Correo,transporter} = require('../models/correoModel');

const aprobarSolicitud = async (req,res) => {
    const {idsolicitante,idbeca} = req.body;

    try {
        
        // Verificar que el estudiante existe
        const solicitante = await SolicitanteModel.obtenerSolicitante({idsolicitante:idsolicitante});
        if (solicitante.length == 0) return res.json({message:`No se encontró el solicitante con id ${idsolicitante}.`})
        



        // aprobar solicitud
        const solicitud = {
            idempleado:2,
            idsolicitante:idsolicitante,
            idbeca:idbeca
        }
        const _idsolicitud = await SolicitudModel.aprobarSolicitud(solicitud);
        
    


        // generar y encriptar contraseña del usuario
        const password = generarContrasenia();
        const contrasenia_encriptada = await encriptar_contrasenia(password);
        console.log("contrasenia_encriptada")
        console.log(contrasenia_encriptada)



        // crear usuario al becario
        const usuario = {
            correo:solicitante[0].correoinstitucional,
            contrasenia:contrasenia_encriptada,
            idrol:1
        }
        const _idusuario = await UsuarioModel.ingresarUsuario(usuario)




        // ingresar registro becario
        const becario = {
            nocuenta:solicitante[0].nocuenta,
            idusuario:_idusuario,
            idsolicitud:_idsolicitud,
            idbeca:idbeca
        }
        const respuesta = await BecarioModel.ingresarBecario(becario);
        
     
        





                
        // // enviar correo al becario una vez que su usuario ha sido creado
        // const correo = new Correo();
        // correo.setPara(solicitante[0].correoinstitucional)
        // correo.setAsunto('Solicitud de aplicación a beca');
        // correo.setMensaje(`
        //     Cordial saludo estimado ${solicitante[0].primernombre} ${solicitante[0].primerapellido}.
        //     Es de nuestro agrado informarle que su solicitud para aplicar a la beca ha sido aprobada.
        //     Esta es su contraseña: ${password}
        //     Por seguridad ingrese a la plataforma y cambiela.
        // `)
        // transporter.sendMail(correo.mailOptions,(err,info)=>{
        //     if (err) return res.json({error:err.message});
        // })

        
        return res.status(200).json(respuesta);
    } catch (error) {
        return res.json({message:error.message})
    }
}


const rechazarSolicitud = async (req,res)=>{
    try {
        const {idsolicitante} = req.body;
        const respuesta = await SolicitudModel
        .rechazarSolicitud({idempleado:2,idsolicitante:idsolicitante});
        
        res.status(200).json({respuesta:respuesta});
    } catch (error) {
        res.json({error:error.message});
    }
}




function generarContrasenia(){
    let contrasenia = '';
    const longitud_contrasenia = 12;
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    for (let i=0;i<longitud_contrasenia;i++){
        contrasenia+=caracteres[Math.floor(Math.random()*caracteres.length)]
    }
    return contrasenia;
}
async function encriptar_contrasenia(password) {
    const contrasenia_encriptada = await bcrypt.hash(password,10);
    return contrasenia_encriptada;
}





module.exports = {
    aprobarSolicitud,
    rechazarSolicitud
}

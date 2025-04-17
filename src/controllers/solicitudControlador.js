const BecarioModel = require('../models/becarioModel');
const SolicitudModel = require('../models/solicitudModel');
const UsuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const {Correo,transporter} = require('../models/correoModel');



// obtener una lista de las solicitudes que se encuentran pendientes
const obtenerSolicitudes = async(req,res) => {
    try {
        const respuesta = await SolicitudModel.obtenerSolicitudes();
        res.status(200).json(respuesta);
    } catch (error) {
        res.json({error:error.message});
    }
}

// obtener una lista de las solicitudes que se encuentran pendientes
const obtenerSolicitudesPendientes = async(req,res) => {
    try {
        const respuesta = await SolicitudModel.obtenerSolicitudesPendientes();
        res.status(200).json(respuesta);
    } catch (error) {
        res.json({error:error.message});
    }
}
// obtener una lista de las solicitudes que han sido aprobadas
const obtenerSolicitudesAprobadas = async(req,res) => {
    try {
        const respuesta = await SolicitudModel.obtenerSolicitudesAprobadas();
        res.status(200).json(respuesta);
    } catch (error) {
        res.json({error:error.message});
    }
}

// obtener una lista de las solicitudes que han sido rechazadas
const obtenerSolicitudesRechazadas = async(req,res) => {
    try {
        const respuesta = await SolicitudModel.obtenerSolicitudesRechazadas();
        res.status(200).json(respuesta);
    } catch (error) {
        res.json({error:error.message});
    }
}

// obtener una solicitud en especícico
const obtenerSolicitud = async (req,res) => {
    const id_solicitud = req.params.idsolicitud;
    try {
        const respuesta = await SolicitudModel.obtenerSolicitud(id_solicitud);
        res.status(200).json(respuesta);
    } catch (error) {
        res.json({error:error.message});
    }
}




const aprobarSolicitud = async (req,res) => {
    const {idsolicitud, idbeca} = req.body;
    const idempleado = 2;

    try {
        
        // Obtener algunos datos del solicitante
        const solicitante = await SolicitudModel.obtenerSolicitud(idsolicitud);
        if (solicitante.length == 0) return res.json({message:`No se encontró la solicitud con id ${idsolicitud}.`})
        



        // aprobar solicitud
        const solicitud = {
            idsolicitud:idsolicitud,
            idempleado:idempleado,
            idbeca:idbeca
        }
        const _idsolicitud = await SolicitudModel.aprobarSolicitud(solicitud);
        
        
    

        

        // crear usuario al becario
        const usuario = {
            correo:solicitante[0].correoinstitucional,
            contrasenia:'1234',
            idrol:1
        }
        const _idusuario = await UsuarioModel.ingresarUsuario(usuario)

        // // generar y encriptar contraseña del usuario
        // let contrasenia = generarContrasenia();
        // contrasenia_encriptada = await encriptar_contrasenia(contrasenia);
        

        // // crear usuario al becario
        // const usuario = {
        //     correo:solicitante[0].correoinstitucional,
        //     contrasenia:contrasenia_encriptada,
        //     idrol:1
        // }
        // const _idusuario = await UsuarioModel.ingresarUsuario(usuario)




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
        //     Reciba un cordial saludo estimado ${solicitante[0].primernombre} ${solicitante[0].primerapellido}.
        //     Es de nuestro agrado informarle que su solicitud para aplicar a la beca ha sido aprobada.
        //     Esta es su contraseña: ${contrasenia}
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
    const idempleado = 2;
    const {idsolicitud} = req.params;
    try {
        const respuesta = await SolicitudModel
        .rechazarSolicitud({idempleado:idempleado,idsolicitud:idsolicitud});
        
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
    const contrasenia_encriptada = 'hola';//await bcrypt.hash(password,10);
    return contrasenia_encriptada;
}





module.exports = {
    obtenerSolicitudes,
    obtenerSolicitud,
    aprobarSolicitud,
    rechazarSolicitud,
    obtenerSolicitudesPendientes,
    obtenerSolicitudesAprobadas,
    obtenerSolicitudesRechazadas
}




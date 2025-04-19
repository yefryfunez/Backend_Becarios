const BecarioModel = require('../models/becarioModel');
const SolicitudModel = require('../models/solicitudModel');
const UsuarioModel = require('../models/usuarioModel');
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
    const idempleado = req.usuario.idempleado;
    if(!idempleado) return res.json('Id del empleado no especificado');

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
        // let password = generarContrasenia();
        let password = solicitante[0].primernombre;
        const usuario = {
            correo:solicitante[0].correoinstitucional,
            contrasenia:password,
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
        
     
    

                
        // enviar correo al becario una vez que su usuario ha sido creado
        
            const correo = new Correo();
            correo.setPara('yadirvasquezx2@gmail.com')
            correo.setAsunto('Solicitud de aplicación a beca');
            correo.setMensaje(`
                Reciba un cordial saludo estimado ${solicitante[0].primernombre} ${solicitante[0].primerapellido}.
                Es de nuestro agrado informarle que su solicitud para aplicar a la beca ha sido aprobada.
                Para ingresar a la plataforma de su usuario será su correo institucional: ${solicitante[0].correoinstitucional}
                y su su contraseña es: ${password}
                Por seguridad ingrese a la plataforma y cambie la contraseña los más pronto posible.
            `)
            transporter.sendMail(correo.mailOptions,(err,info)=>{
                if (err) return res.json({error:err.message});
            })
        
        
        return res.status(200).json(respuesta);
    } catch (error) {
        return res.json({message:error.message})
    }
}


const rechazarSolicitud = async (req,res)=>{
    const idempleado = req.usuario.idempleado;
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




module.exports = {
    obtenerSolicitudes,
    obtenerSolicitud,
    aprobarSolicitud,
    rechazarSolicitud,
    obtenerSolicitudesPendientes,
    obtenerSolicitudesAprobadas,
    obtenerSolicitudesRechazadas
}




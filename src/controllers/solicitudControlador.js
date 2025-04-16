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
    const {idsolicitud,idbeca} = req.body;
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
        
        
    


        // generar y encriptar contraseña del usuario
        let contrasenia = generarContrasenia();
        contrasenia_encriptada = await encriptar_contrasenia(contrasenia);
        

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












//  select insertsolicitante('0809199496919','20211017007', '97184799','correo.institucional@ejemplo.unah.hn','Raúl','Sergio','Figueroa','Milla','1994-11-6','masculino','unión libre','garifuna','ninguna','trabajo',83.2,92.9,'https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/pdf-files/requisitos_becas/2025_3_0801199755555_requisitos_beca.pdf');
//  select insertsolicitante('0807200215953','20151027681', '99572020','correo.institucional@ejemplo.unah.hn','Ernesto','Eduardo','Perez','Paz','2002-11-2','masculino','soltero','mestizo','ninguna','trabajo',91.2,91.1,'https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/pdf-files/requisitos_becas/2025_3_0801199755555_requisitos_beca.pdf');
//  select insertsolicitante('0806200027933','20191019832', '88571311','correo.institucional@ejemplo.unah.hn','Juan','Miguel','Pinto','Enamorado','2000-11-0','masculino','viudo','mestizo','ninguna','trabajo',93.4,81,'https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/pdf-files/requisitos_becas/2025_3_0801199755555_requisitos_beca.pdf');
//  select insertsolicitante('0803199697539','20241021676', '82923115','correo.institucional@ejemplo.unah.hn','Luis','Gilberto','Padilla','Warren','1996-11-2','masculino','divorciado','mestizo','ninguna','trabajo',80.6,92.8,'https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/pdf-files/requisitos_becas/2025_3_0801199755555_requisitos_beca.pdf');
//  select insertsolicitante('0803200226331','20151036848', '94462690','correo.institucional@ejemplo.unah.hn','Gilberto','Eduardo','Martinez','Navarro','2002-11-2','masculino','viudo','mestizo','ninguna','trabajo',85.3,82.4,'https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/pdf-files/requisitos_becas/2025_3_0801199755555_requisitos_beca.pdf');
//  select insertsolicitante('0805199585870','20231004852', '85794901','correo.institucional@ejemplo.unah.hn','Edgar','Jesús','Hernandez','Hernandez','1995-11-0','masculino','soltero','mestizo','ninguna','trabajo',90.7,81.8,'https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/pdf-files/requisitos_becas/2025_3_0801199755555_requisitos_beca.pdf');
//  select insertsolicitante('0802200112697','20231011717', '89828486','correo.institucional@ejemplo.unah.hn','Arturo','Cruz','Calvo','Chinchilla','2001-11-1','masculino','unión libre','mestizo','ninguna','trabajo',89.5,84.5,'https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/pdf-files/requisitos_becas/2025_3_0801199755555_requisitos_beca.pdf');
//  select insertsolicitante('0809199429107','20201013003', '81324598','correo.institucional@ejemplo.unah.hn','Antonio','Jaime','Pastor ','Figueroa','1994-11-6','masculino','soltero','mestizo','ninguna','trabajo',84.8,85.1,'https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/pdf-files/requisitos_becas/2025_3_0801199755555_requisitos_beca.pdf');
//  select insertsolicitante('0804199614409','20191019168', '98016604','correo.institucional@ejemplo.unah.hn','Gilberto','Arturo','Flores','Tabora','1996-11-2','masculino','soltero','mestizo','ninguna','trabajo',87.4,81.1,'https://nbzfqacscxqdfrvrdinu.supabase.co/storage/v1/object/public/pdf-files/requisitos_becas/2025_3_0801199755555_requisitos_beca.pdf');

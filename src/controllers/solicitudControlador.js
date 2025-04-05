const BecarioModel = require('../models/becarioModel');
const SolicitanteModel = require('../models/solicitanteModel');
const SolicitudModel = require('../models/solicitudModel');
const UsuarioModel = require('../models/usuarioModel');


const aprobarSolicitud = async (req,res) => {
    const {idsolicitante,idempleado,idbeca} = req.body;

    try {
        
        // buscar al solicitante
        const solicitante = await SolicitanteModel.obtenerSolicitante({idsolicitante:idsolicitante});
        if (solicitante.length == 0) return res.json({message:`No se encontró el solicitante con id ${idsolicitante}.`})
        





        
        const solicitud = {
            idempleado:idempleado,
            idsolicitante:idsolicitante,
            idbeca:idbeca
        }
        const _idsolicitud = await SolicitudModel.aprobarSolicitud(solicitud);

    





        // ingresar un usuario
        const usuario = {
            correo:solicitante[0].correoinstitucional,
            contrasenia:'1234',
            idrol:1
        }
        const _idusuario = await UsuarioModel.ingresarUsuario(usuario)







        // ingresar un becario
        const becario = {
            nocuenta:solicitante[0].nocuenta,
            idusuario:_idusuario,
            idsolicitud:_idsolicitud,
            idbeca:idbeca
        }
        const respuesta = await BecarioModel.ingresarBecario(becario);
        
        
        
        return res.status(200).json(respuesta);
    } catch (error) {
        return res.json({message:error.message})
    }
}


const rechazarSolicitud = async (req,res)=>{
    try {
        const {idsolicitante,idempleado} = req.body;
        const respuesta = await SolicitudModel
        .rechazarSolicitud({idempleado:idempleado,idsolicitante:idsolicitante});
        
        res.status(200).json({respuesta:respuesta});
    } catch (error) {
        res.json({error:error.message});
    }
}



module.exports = {
    aprobarSolicitud,
    rechazarSolicitud
}
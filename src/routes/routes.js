// librerías
const express = require('express');
const router = express.Router();



// importación de controladores
const {obtenerSolicitantes,ingresarSolicitante,obtenerSolicitante} = require('../controllers/solicitanteControlador');
const {obtenerPublicaciones,ingresarPublicacion} = require('../controllers/publicacionControlador');
const { obtenerActividades,insertarActividad,actualizarActividad,eliminarActividad,inscribirActividad, historialActividades } = require('../controllers/actividadControlador');
const {soporteTecnico} = require('../controllers/soporteControlador');
const {obtenerSolicitudesPendientes,obtenerSolicitudesAprobadas, obtenerSolicitudesRechazadas, obtenerSolicitudes,obtenerSolicitud,aprobarSolicitud,rechazarSolicitud} 
= require('../controllers/solicitudControlador');
const {obtenerReportesSolicitantes,insertarReporteSolicitante,actualizarReporteSolicitante,eliminarReporteSolicitante} = require('../controllers/reporteSolicitanteControlador');
const {ingresarNotificacion} = require('../controllers/notificacionControlador');
const {miPerfil} = require('../controllers/becarioControlador');



// middleware para subir archivo requisitos
const upload = require('../middlewares/multer');


// rutas para publicaciones
router.get('/api/obtener_publicaciones',obtenerPublicaciones);
router.post('/api/ingresar_publicacion',upload.single('file'),ingresarPublicacion);


// rutas soporte tecnico
router.post('/api/soporte_tecnico',soporteTecnico);



// rutas para el modulo de solicitantes
router.post('/api/ingresar_solicitante/',upload.single('file'),ingresarSolicitante);
// router.get('/api/obtener_solicitantes/',obtenerSolicitantes);
// router.get('/api/obtener_solicitante/:idsolicitante',obtenerSolicitante);







// Rutas para el módulo de ReportesSolicitantes
router.get('/api/obtener_reportes', obtenerReportesSolicitantes);
router.post('/api/ingresar_reporte', insertarReporteSolicitante);
router.put('/api/actualizar_reporte/:idReporte', actualizarReporteSolicitante);
router.delete('/api/eliminar_reporte/:idReporte', eliminarReporteSolicitante);








// rutas para el modulo de actividades
router.get('/api/obtener_actividades', obtenerActividades);
router.post('/api/ingresar_actividad', insertarActividad);
router.put('/api/actualizar_actividad/:idactividades', actualizarActividad);
router.delete('/api/eliminar_actividad/:idactividades', eliminarActividad);
router.post('/api/inscribir_actividad/:idactividad',inscribirActividad);
router.get('/api/historia_actividades/', historialActividades);







// ruta para manejar la solicitudes
router.get('/api/obtener_solicitudes',obtenerSolicitudes);
router.get('/api/obtener_solicitud/:idsolicitud',obtenerSolicitud);
router.post('/api/aprobar_solicitud',aprobarSolicitud);
router.post('/api/rechazar_solicitud/:idsolicitud',rechazarSolicitud);
// opcionales
router.get('/api/obtener_solicitudes_pendientes',obtenerSolicitudesPendientes);
router.get('/api/obtener_solicitudes_aprobadas',obtenerSolicitudesAprobadas);
router.get('/api/obtener_solicitudes_rechazadas',obtenerSolicitudesRechazadas);






// rutas para notificaciones
router.post('/api/ingresar_notificacion',ingresarNotificacion);
router.get('/api/mi_perfil/', miPerfil);




router.get('/solicitantes/formulario',async (req,res)=>{
    res.render('index.js')
})


module.exports = router;







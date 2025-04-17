
// librerías
const express = require('express');
const router = express.Router();



// importación de controladores
const {obtenerSolicitantes,ingresarSolicitante,obtenerSolicitante} = require('../controllers/solicitanteControlador');
const {obtenerPublicaciones,ingresarPublicacion} = require('../controllers/publicacionControlador');

const {obtenerActividades, obtenerActividadesDisponibles,insertarActividad,actualizarActividad,eliminarActividad, detalleActividad } = require('../controllers/actividadControlador');
const { marcarAsistencia, habilitarAsistencia, deshabilitarAsistencia,inscribirActividad, historialActividades } = require('../controllers/actividadControlador');
const { obtenerActividadesDisponiblesEmpleado } = require('../controllers/actividadControlador');

const {soporteTecnico} = require('../controllers/soporteControlador');
const {obtenerSolicitudesPendientes,obtenerSolicitudesAprobadas, obtenerSolicitudesRechazadas, obtenerSolicitudes,obtenerSolicitud,aprobarSolicitud,rechazarSolicitud} 
= require('../controllers/solicitudControlador');
const {obtenerReportesSolicitantes,insertarReporteSolicitante,actualizarReporteSolicitante,eliminarReporteSolicitante,generarReporteSolicitantesPDF,generarReporteSolicitantesExcel} = require('../controllers/reporteSolicitanteControlador');
const {ingresarNotificacion} = require('../controllers/notificacionControlador');
const {miPerfil} = require('../controllers/becarioControlador');
const {obtenerPagos,insertarPago,actualizarPago,eliminarPago} = require('../controllers/pagoControlador');
const {perfilEmpleado} = require('../controllers/empleadoControlador');

// middleware para subir archivo requisitos
const upload = require('../middlewares/multer');







// ##############################################################################################
//                 BECARIO
// ##############################################################################################
// mi perfil
router.get('/api/mi_perfil/', miPerfil);

// rutas para el modulo de actividades
router.get('/api/obtener_actividades_disponibles', obtenerActividadesDisponibles);
router.get('/api/detalle_actividad/:idactividades', detalleActividad);
router.post('/api/inscribir_actividad/:idactividad',inscribirActividad);

router.get('/api/marcar_asistencia/:idactividad', marcarAsistencia)

router.get('/api/historial_actividades/', historialActividades);











// ##############################################################################################
//                 LANDING
// ##############################################################################################

// rutas para publicaciones
router.get('/api/obtener_publicaciones',obtenerPublicaciones);

// rutas soporte tecnico
router.post('/api/soporte_tecnico',soporteTecnico);

// rutas para el modulo de solicitantes
router.post('/api/ingresar_solicitante/',upload.single('file'),ingresarSolicitante);













// ##############################################################################################
//                 EMPLEADO
// ##############################################################################################
router.get('/api/perfil_empleado', perfilEmpleado);
// rutas para publicaciones
router.post('/api/ingresar_publicacion',upload.single('file'),ingresarPublicacion);

// rutas para el modulo de actividades
router.post('/api/ingresar_actividad', insertarActividad);
router.get('/api/obtener_actividades', obtenerActividades);//obtener todas las actividades
router.get('/api/obtener_actividades_dispobibles_empleado', obtenerActividadesDisponiblesEmpleado);//obtener actividades disponibles apartir hoy
router.put('/api/actualizar_actividad/:idactividades', actualizarActividad);
router.delete('/api/eliminar_actividad/:idactividades', eliminarActividad);
router.get('/api/habilitar_asistencia/:idactividad', habilitarAsistencia)
router.get('/api/deshabilitar_asistencia/:idactividad', deshabilitarAsistencia)



// ruta para manejar la solicitudes
router.get('/api/obtener_solicitudes',obtenerSolicitudes);
router.get('/api/obtener_solicitud/:idsolicitud',obtenerSolicitud);
router.post('/api/aprobar_solicitud',aprobarSolicitud);
router.post('/api/rechazar_solicitud/:idsolicitud',rechazarSolicitud);
// opcionales
router.get('/api/obtener_solicitudes_pendientes',obtenerSolicitudesPendientes);
router.get('/api/obtener_solicitudes_aprobadas',obtenerSolicitudesAprobadas);
router.get('/api/obtener_solicitudes_rechazadas',obtenerSolicitudesRechazadas);
















// Rutas para el módulo de ReportesSolicitantes
router.get('/api/obtener_reportes', obtenerReportesSolicitantes);
router.post('/api/ingresar_reporte', insertarReporteSolicitante);
router.put('/api/actualizar_reporte/:idReporte', actualizarReporteSolicitante);
router.delete('/api/eliminar_reporte/:idReporte', eliminarReporteSolicitante);
router.get('/api/reporte_solicitantes/pdf', generarReporteSolicitantesPDF);
router.get('/api/reporte_solicitantes/excel', generarReporteSolicitantesExcel);


// rutas para el módulo de pagos
router.get('/api/obtener_pagos', obtenerPagos);
router.post('/api/ingresar_pago', insertarPago);
router.put('/api/actualizar_pago/:idpagos', actualizarPago);
router.delete('/api/eliminar_pago/:idpagos', eliminarPago);


// rutas para notificaciones
// router.post('/api/ingresar_notificacion',ingresarNotificacion);












router.get('/solicitantes/formulario',async (req,res)=>{
    res.render('index.js')
})


module.exports = router;


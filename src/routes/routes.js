
// librerías
const express = require('express');
const router = express.Router();

const rol_empleado = 2;
const rol_becario = 1;


// importación de controladores
const {obtenerSolicitantes,ingresarSolicitante,obtenerSolicitante} = require('../controllers/solicitanteControlador');
const {obtenerPublicaciones,ingresarPublicacion} = require('../controllers/publicacionControlador');

const {obtenerActividades, obtenerActividadesDisponibles,insertarActividad,actualizarActividad,eliminarActividad, detalleActividad } = require('../controllers/actividadControlador');
const { marcarAsistencia, habilitarAsistencia, deshabilitarAsistencia,inscribirActividad, historialActividades } = require('../controllers/actividadControlador');
const { obtenerActividadesDisponiblesEmpleado } = require('../controllers/actividadControlador');

const {soporteTecnico} = require('../controllers/soporteControlador');
const {obtenerSolicitudesPendientes,obtenerSolicitudesAprobadas, obtenerSolicitudesRechazadas, obtenerSolicitudes,obtenerSolicitud,aprobarSolicitud,rechazarSolicitud} 
= require('../controllers/solicitudControlador');
const {obtenerReportesSolicitantes,insertarReporteSolicitante,actualizarReporteSolicitante,eliminarReporteSolicitante,generarReporteSolicitantesPDF,generarReporteSolicitantesExcel,reporteCompleto,generarReporteCompletoExcel} = require('../controllers/reporteSolicitanteControlador');
const {ingresarNotificacion} = require('../controllers/notificacionControlador');
const {miPerfil} = require('../controllers/becarioControlador');
const {obtenerPagos,insertarPago,actualizarPago,eliminarPago} = require('../controllers/pagoControlador');
const {perfilEmpleado} = require('../controllers/empleadoControlador');
const {login} = require('../controllers/usuarioControlador');
const { enviarCodigo } = require('../controllers/usuarioControlador');



// middleware para subir archivo requisitos
const upload = require('../middlewares/multer');
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/roleMiddleware');






router.post('/api/login',login);
router.post('/api/enviar_codigo_recuperacion',enviarCodigo)
//falta la parte de recuperacion de contraseña





// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//      endpoints protegidos sin autenticació
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// // ##############################################################################################
// //                 LANDING
// // ##############################################################################################

// rutas para publicaciones
router.get('/api/obtener_publicaciones',obtenerPublicaciones);

// rutas soporte tecnico
router.post('/api/soporte_tecnico',soporteTecnico);

// rutas para el modulo de solicitantes
router.post('/api/ingresar_solicitante/',upload.single('file'),ingresarSolicitante);









// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//      endpoints protegidos con autenticación
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// ##############################################################################################
//                 BECARIO - con autenticación
// ##############################################################################################
// // mi perfil
router.get('/api/mi_perfil/', verificarToken, verificarRol(rol_becario), miPerfil);
// // rutas para el modulo de actividades
router.get('/api/obtener_actividades_disponibles', verificarToken, verificarRol(rol_becario), obtenerActividadesDisponibles);
router.get('/api/detalle_actividad/:idactividades', verificarToken, detalleActividad);
router.post('/api/inscribir_actividad/:idactividad',verificarToken, verificarRol(rol_becario), inscribirActividad);
router.get('/api/marcar_asistencia/:idactividad', verificarToken, verificarRol(rol_becario), marcarAsistencia)
router.get('/api/historial_actividades/', verificarToken, verificarRol(rol_becario), historialActividades);



// // ##############################################################################################
// //                 EMPLEADO - con autenticacion
// // ##############################################################################################
// router.get('/api/perfil_empleado', verificarToken, verificarRol(rol_empleado), perfilEmpleado);
router.get('/api/perfil_empleado',verificarToken,verificarRol(rol_empleado), perfilEmpleado);
// // rutas para publicaciones
router.post('/api/ingresar_publicacion',upload.single('file'), verificarToken,verificarRol(rol_empleado), ingresarPublicacion);

// // rutas para el modulo de actividades
router.post('/api/ingresar_actividad', verificarToken,verificarRol(rol_empleado), insertarActividad);
router.get('/api/obtener_actividades', verificarToken,verificarRol(rol_empleado), obtenerActividades);//obtener todas las actividades
router.get('/api/obtener_actividades_dispobibles_empleado', verificarToken,verificarRol(rol_empleado), obtenerActividadesDisponiblesEmpleado);//obtener actividades disponibles apartir hoy
router.put('/api/actualizar_actividad/:idactividades', verificarToken,verificarRol(rol_empleado), actualizarActividad);
router.delete('/api/eliminar_actividad/:idactividades', verificarToken,verificarRol(rol_empleado), eliminarActividad);
router.get('/api/habilitar_asistencia/:idactividad', verificarToken,verificarRol(rol_empleado), habilitarAsistencia)
router.get('/api/deshabilitar_asistencia/:idactividad', verificarToken, verificarRol(rol_empleado), deshabilitarAsistencia)

// ruta para manejar la solicitudes
router.get('/api/obtener_solicitudes',verificarToken,verificarRol(rol_empleado), obtenerSolicitudes);
router.get('/api/obtener_solicitud/:idsolicitud',verificarToken,verificarRol(rol_empleado), obtenerSolicitud);
router.post('/api/aprobar_solicitud',verificarToken,verificarRol(rol_empleado), aprobarSolicitud);
router.post('/api/rechazar_solicitud/:idsolicitud',verificarToken,verificarRol(rol_empleado), rechazarSolicitud);
// opcionales
router.get('/api/obtener_solicitudes_pendientes',verificarToken,verificarRol(rol_empleado), obtenerSolicitudesPendientes);
router.get('/api/obtener_solicitudes_aprobadas',verificarToken,verificarRol(rol_empleado), obtenerSolicitudesAprobadas);
router.get('/api/obtener_solicitudes_rechazadas',verificarToken,verificarRol(rol_empleado), obtenerSolicitudesRechazadas);



















// Ruta para obtener el reporte completo
router.get('/api/reporte_completo', verificarToken, verificarRol(rol_empleado), reporteCompleto);

//Ruta para generar archivo excel del reporte completo
router.get('/api/reporte_completo_excel', verificarToken, verificarRol(rol_empleado), generarReporteCompletoExcel);



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



// librerías
const express = require('express');
const router = express.Router();
const rol_empleado = 2;
const rol_becario = 1;


// importación de controladores
const {ingresarSolicitante} = require('../controllers/solicitanteControlador');
const {obtenerPublicaciones,ingresarPublicacion, eliminarPublicacion} = require('../controllers/publicacionControlador');

const {obtenerActividades, obtenerActividadesDisponibles,insertarActividad,actualizarActividad,eliminarActividad, detalleActividad } = require('../controllers/actividadControlador');
const { marcarAsistencia, habilitarAsistencia, deshabilitarAsistencia,inscribirActividad, historialActividades } = require('../controllers/actividadControlador');
const { obtenerActividadesDisponiblesEmpleado } = require('../controllers/actividadControlador');

const {soporteTecnico} = require('../controllers/soporteControlador');
const {obtenerSolicitudesPendientes,obtenerSolicitudesAprobadas, obtenerSolicitudesRechazadas, obtenerSolicitudes,obtenerSolicitud,aprobarSolicitud,rechazarSolicitud} = require('../controllers/solicitudControlador');
const {obtenerReportesSolicitantes,insertarReporteSolicitante,actualizarReporteSolicitante,eliminarReporteSolicitante,generarReporteSolicitantesPDF,generarReporteSolicitantesExcel,reporteCompleto,generarReporteCompletoExcel} = require('../controllers/reporteSolicitanteControlador');
const {ingresarNotificacion, obtenerNotificaciones} = require('../controllers/notificacionControlador');
const {miPerfil, obtenerBecarios,obtenerBecario} = require('../controllers/becarioControlador');
const {generarPagos, obtenerPagos,insertarPago,actualizarPago,eliminarPago} = require('../controllers/pagoControlador');
const {perfilEmpleado} = require('../controllers/empleadoControlador');
const {login} = require('../controllers/usuarioControlador');
const { enviarCodigo } = require('../controllers/usuarioControlador');



// middleware para subir archivo requisitos
const upload = require('../middlewares/multer');
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/roleMiddleware');






// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//                      AGREGADO RECIENTEMENTE
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// obtener todos los becarios
router.get('/api/obtener_becarios/',verificarToken, verificarRol(rol_empleado),obtenerBecarios);
// obtener todos los becarios según la beca especificada
router.get('/api/obtener_becarios/:idbeca',verificarToken, verificarRol(rol_empleado),obtenerBecarios);
// obtener todos los becarios según el número de cuenta
router.get('/api/obtener_becario/:nocuenta',verificarToken, verificarRol(rol_empleado),obtenerBecario);



// Rutas para las notificaciones
router.post('/api/ingresar_notificacion', verificarToken, verificarRol(rol_empleado), ingresarNotificacion);
router.get('/api/obtener_notificaciones', verificarToken, obtenerNotificaciones);

// Ruta para eliminar una publicacion
router.delete('/api/eliminar_publicacion/:idpublicacion', verificarToken, verificarRol(rol_empleado), eliminarPublicacion);
router.get('/api/generar_pagos',verificarToken, verificarRol(rol_empleado),generarPagos);

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
























router.post('/api/login',login);
router.post('/api/ingresar_correo',enviarCodigo);
// router.post('/api/verificar_codigo',verificarCodigo);
//falta la parte de recuperacion de contraseña





// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//      endpoints sin autenticación
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
//obtener todas las actividades
router.get('/api/obtener_actividades', verificarToken,verificarRol(rol_empleado), obtenerActividades);
//obtener actividades disponibles apartir hoy
router.get('/api/obtener_actividades_disponibles_empleado', verificarToken,verificarRol(rol_empleado), obtenerActividadesDisponiblesEmpleado);
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
router.get('/api/obtener_reportes', verificarToken, verificarRol(rol_empleado), obtenerReportesSolicitantes);
router.post('/api/ingresar_reporte', verificarToken, verificarRol(rol_empleado), insertarReporteSolicitante);
router.put('/api/actualizar_reporte/:idReporte', verificarToken, verificarRol(rol_empleado), actualizarReporteSolicitante);
router.delete('/api/eliminar_reporte/:idReporte', verificarToken, verificarRol(rol_empleado), eliminarReporteSolicitante);
router.get('/api/reporte_solicitantes/pdf', verificarToken, verificarRol(rol_empleado), generarReporteSolicitantesPDF);
router.get('/api/reporte_solicitantes/excel', verificarToken, verificarRol(rol_empleado), generarReporteSolicitantesExcel);



// rutas para el módulo de pagos
router.get('/api/obtener_pagos', verificarToken, verificarRol(rol_empleado), obtenerPagos);
router.post('/api/ingresar_pago', verificarToken, verificarRol(rol_empleado), insertarPago);
router.put('/api/actualizar_pago/:idpagos', verificarToken, verificarRol(rol_empleado), actualizarPago);
router.delete('/api/eliminar_pago/:idpagos', verificarToken, verificarRol(rol_empleado), eliminarPago);
// falta el generar pagaos








router.get('/solicitantes/formulario',async (req,res)=>{
    res.render('index.js')
})    


module.exports = router;


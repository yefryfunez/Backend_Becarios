// librerías
const express = require('express');
const router = express.Router();



// importación de controladores
const {obtenerSolicitantes,ingresarSolicitante,obtenerSolicitante} = require('../controllers/solicitanteControlador');
const {obtenerPublicaciones,ingresarPublicacion} = require('../controllers/publicacionControlador')
const { obtenerActividades,insertarActividad,actualizarActividad,eliminarActividad } = require('../controllers/actividadControlador');
const {soporteTecnico} = require('../controllers/soporteControlador');
const {aprobarSolicitud,rechazarSolicitud} = require('../controllers/solicitudControlador');



// middleware para subir archivo requisitos
const upload = require('../middlewares/multer');



// rutas para el modulo de solicitantes
router.get('/api/obtener_solicitantes/',obtenerSolicitantes);
router.post('/api/ingresar_solicitante/',upload.single('file'),ingresarSolicitante);
router.get('/api/obtener_solicitante/:idsolicitante',obtenerSolicitante);


// rutas para publicaciones
router.get('/api/obtener_publicaciones',obtenerPublicaciones);
router.post('/api/ingresar_publicacion',upload.single('file'),ingresarPublicacion);


// rutas para el modulo de actividades
router.get('/api/obtener_actividades', obtenerActividades);
router.post('/api/ingresar_actividad', insertarActividad);
router.put('/api/actualizar_actividad/:idactividades', actualizarActividad);
router.delete('/api/eliminar_actividad/:idactividades', eliminarActividad);


// rutas soporte tecnico
router.post('/api/soporte_tecnico',soporteTecnico);


// ruta para manejar la solicitudes
router.post('/api/aprobar_solicitud',aprobarSolicitud);
router.post('/api/rechazar_solicitud',rechazarSolicitud);



router.get('/solicitantes/formulario',async (req,res)=>{
    res.render('index.js')
})


module.exports = router;

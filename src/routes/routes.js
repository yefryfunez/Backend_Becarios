// librerías
const express = require('express');
const router = express.Router();



// importación de controladores
const {obtenerSolicitantes,ingresarSolicitante,obtenerSolicitanteByNoCuenta} = require('../controllers/solicitanteControlador');
const {obtenerPublicaciones,ingresarPublicacion} = require('../controllers/publicacionControlador')
const { obtenerActividades,insertarActividad,actualizarActividad,eliminarActividad } = require('../controllers/actividadControlador')



// middleware para subir archivo requisitos
const upload = require('../middlewares/multer');



// rutas para el modulo de solicitantes
router.get('/api/obtener_solicitantes/',obtenerSolicitantes);
router.post('/api/ingresar_solicitante/',upload.single('file'),ingresarSolicitante);


// rutas para publicaciones
router.get('/api/obtener_publicaciones',obtenerPublicaciones);
router.post('/api/ingresar_publicacion',upload.single('file'),ingresarPublicacion);



// rutas para el modulo de actividades
router.get('/api/obtener_actividades', obtenerActividades);
router.post('/api/ingresar_actividad', insertarActividad);
router.put('/api/actualizar_actividad/:idactividades', actualizarActividad);
router.delete('/api/eliminar_actividad/:idactividades', eliminarActividad);


router.get('/solicitantes/formulario',async (req,res)=>{
    res.render('index.js')
})


module.exports = router;
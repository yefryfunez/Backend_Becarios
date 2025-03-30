// librerías
const express = require('express');
const router = express.Router();



// importación de controladores
const {obtenerSolicitantes,ingresarSolicitante} = require('../controllers/solicitanteControlador');
const {obtenerPublicaciones,ingresarPublicacion} = require('../controllers/publicacionControlador')
const {enviarCorreo} = require('../controllers/soporteControlador')


// middleware para subir archivo requisitos
const upload = require('../middlewares/multer');



// rutas para el modulo de solicitantes
router.get('/api/obtener_solicitantes/',obtenerSolicitantes);
router.post('/api/ingresar_solicitante/',upload.single('file'),ingresarSolicitante);


// rutas para publicaciones
router.get('/api/obtener_publicaciones',obtenerPublicaciones);
router.post('/api/ingresar_publicacion',upload.single('file'),ingresarPublicacion);

// rutas soporte
router.post('/api/enviar_correo',enviarCorreo);



router.get('/solicitantes/formulario',async (req,res)=>{
    res.render('index.js')
})


module.exports = router;
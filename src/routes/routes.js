// librerías
const express = require('express');




const {ingresarSolicitante,
    obtenerSolicitantes,
    obtenerSolicitanteByNoCuenta} 
= require('../controllers/solicitanteControlador');
const router = express.Router();

// middleware para subir archivo requisitos
const upload = require('../middlewares/multer');




// rutas para el modulo de solicitantes
router.get('/api/obtener_solicitantes/',obtenerSolicitantes);
router.get('/api/obtener_un_solicitante/:id',obtenerSolicitanteByNoCuenta);
router.post('/api/ingresar_solicitante/',upload.single('file'),ingresarSolicitante);



// rutas para soporte




router.get('/solicitantes/formulario',async (req,res)=>{
    res.render('index.js')
})


module.exports = router;
// librerías importadas
const express = require('express');
const {getSolicitantes,createSolicitante,updateSolicitante,deleteSolicitante,findSolicitanteByNoCuenta} 
= require('../controllers/solicitanteController');
const router = express.Router();

// middleware para subir archivo requisitos
const upload = require('../middlewares/multer');




// rutas para el modulo de solicitantes
router.get('/obtener_solicitantes/',getSolicitantes);
router.get('/obtener_un_solicitante/:id',findSolicitanteByNoCuenta);
router.post('/ingresar_solicitante/',upload.single('file'),createSolicitante);

router.put('/solicitantes/:id',updateSolicitante);
router.delete('/solicitantes/:id',deleteSolicitante)




router.get('/solicitantes/formulario',async (req,res)=>{
    res.render('index.js')
})



module.exports = router;
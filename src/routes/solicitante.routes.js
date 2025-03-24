// librerías importadas
const express = require('express');
const {getSolicitantes,createSolicitante,updateSolicitante,deleteSolicitante,findSolicitanteByNoCuenta} 
= require('../controllers/solicitanteController');
const router = express.Router();

// middleware para subir archivo requisitos
const upload = require('../middlewares/multer');




// rutas para el modulo de solicitantes
router.get('/solicitantes/',getSolicitantes);
router.post('/solicitantes/',upload.single('file'),createSolicitante);
router.put('/solicitantes/:id',updateSolicitante);
router.delete('/solicitantes/:id',deleteSolicitante)
router.get('/solicitantes/:id',findSolicitanteByNoCuenta);



router.get('/solicitantes/formulario',async (req,res)=>{
    res.render('index.js')
})



module.exports = router;
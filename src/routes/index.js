// librerías
const express = require('express');
const router = express.Router();


// importar rutas
const solicitanteRoutes = require('./solicitante.routes');


// rutas a los controladores
router.use('/api',solicitanteRoutes);



module.exports = router;
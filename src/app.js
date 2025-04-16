
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes/routes');


const PORT = process.env.PORT || 3001;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// routes
app.use(routes);



app.listen(PORT, ()=>{
    console.log(`SERVIDOR CORRIENDO EN EL PUERTO : ${PORT}`);
})


console.log(`-------------------------------NOTA-------------------------------
El id del becario y el id del empleado debería poder obtenerse cuando el usuario inicia sesión, por el momento estamos utilizando un id estático tanto para el becario así como también para el empleado
idempleado=2
idbecario=7
-------------------------------------------------------------------------------`)





const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes/routes');


const PORT = process.env.PORT || 3001;
const app = express();

// middlewares
app.use(cors({
    origin: 'http://localhost:3000', // donde corre tu frontend
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));


// routes
app.use(routes);


app.listen(PORT, ()=>{
    console.log(`SERVIDOR CORRIENDO EN EL PUERTO : ${PORT}`);
})

  
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes/index');


const PORT = process.env.PORT || 3001;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// routes
app.use(routes);


app.get('/', (req, res) => {
    res.json({
        message : 'si da :D'
    })
})

app.listen(PORT, ()=>{
    console.log(`SERVIDOR CORRIENDO EN EL PUERTO : ${PORT}`);
})










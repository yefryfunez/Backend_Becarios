const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes/index');


const PORT = process.env.PORT || 3000;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// routes
app.use(routes);


app.listen(PORT, ()=>{
    `Listening on port ${PORT}`;
})










const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// crea servidor apliacion express

const app = express();

//base de datos
dbConnection();

//DIRECTORIO PUBLICO

app.use(express.static('public'));
//cors

app.use(cors());

//lectura y parceo
app.use(express.json());


//Rutas

app.use('/api/auth', require('./routes/auth'));


app.listen(process.env.PORT,() =>{
    console.log(`servidor correindo en puerto  ${process.env.PORT}`)
});
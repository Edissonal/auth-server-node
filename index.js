const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
const path = require('path');
require('dotenv').config();

// crea servidor apliacion express

const app = express();

//base de datos
dbConnection();

//DIRECTORIO PUBLICO


app.use( express.static('public') );
//cors

app.use(cors());

//lectura y parceo
app.use(express.json());




//Rutas

app.use('/api/auth', require('./routes/auth'));

//manejar todas las posibles rutas

app.get('*',(req,res)=>{

    res.sendFile(path.resolve(__dirname,'public/index.html'));
});

app.listen(process.env.PORT,() =>{
    console.log(`servidor correindo en puerto  ${process.env.PORT}`)
});
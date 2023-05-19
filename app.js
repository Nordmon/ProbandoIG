//const express = require('express'); lO HAGO CON EL IMPORT
import express from 'express';//LA DESECTRUCTURO Y LAS RECOJO
import { dbConection } from "./modelos/consult_db.js";
import router from './routes/index.js';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const app= express();

app.use('/', router);

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static('public'));

app.listen(3000, ()=>{
    dbConection();
    console.log("servidor iniciado localhost:3000");


});


app.use(express.static('./public/'));
app.use(express.static('./public/js/'));
app.use(express.static('./public/css/'));


app.get('/',function(req,res){

    res.render('index')
     
})


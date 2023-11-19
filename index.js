const express=require('express')
const mongoose=require('mongoose')
const cookieParser = require('cookie-parser');
const authRouter =require('./authRouterLog')
const app=express()
const fs=require('fs')
const Music=require('./model/music')
const bodyParser = require('body-parser');
// var fileupload = require("express-fileupload");
const cors = require("cors")
const path = require('path');
const multer=require('multer');


const methodOverride=require('method-override')


const PORT=process.env.PORT||3000

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname,'ejs'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("__method"))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'ejs')));
app.use(cors());


app.use(express.json())


app.use('/auth',authRouter)
start=async()=>{  
    try {
await mongoose.connect('mongodb+srv://farael:farae1aer@cluster0.pkknndw.mongodb.net/')


     app.get('/autor', (req, res) => {
        res.render('creatautor');
    })
     app.get('/', (req, res) => {
        res.render('login');
    });  
    app.get('/music', (req, res) => {
        res.render('musicload');
    });  
      app.listen(PORT,()=>{console.log('server run')})
}catch(e){
        console.log(e)
    }}
    start()

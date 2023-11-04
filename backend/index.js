const express=require('express')
const mongoose=require('mongoose')
const cookieParser = require('cookie-parser');
const authRouter =require('./authRouterLog')
const app=express()
const fs=require('fs')
const Music=require('./model/music')
const bodyParser = require('body-parser');
// var fileupload = require("express-fileupload");
const connect=require('./connectmongo')
const cors = require("cors")
const path = require('path');
const multer=require('multer');
const { required } = require('joi');
const {GridFsStorage} = require('multer-gridfs-storage');
const methodOverride=require('method-override')


connect()




    // app.post('/auth/musiccreate',upload.single('music1'),(req, res)=>{ 
    //     try {
           
    //         if (!req.file) {
    //             return res.status(400).json({ error: 'No file uploaded.' });
    //         }
    
    //         res.json({ message: 'File uploaded successfully.' });
            
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ error: 'Internal server error' });
    //     }
    // })

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
start =async()=>{

  
    try {


     
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

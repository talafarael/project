const express=require('express')
const mongoose=require('mongoose')
const cookieParser = require('cookie-parser');
const authRouter =require('./authRouterLog')
const app=express()
const fs=require('fs')
const Music=require('./model/music')
const bodyParser = require('body-parser');

const cors = require("cors")
const path = require('path');
const multer=require('multer');

const methodOverride=require('method-override')


const PORT=process.env.PORT||3000

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname,'ejs'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("__method"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'ejs')));



app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin:process.env.ACCESSCOOKIE, 
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization, Set-Cookie'
}));


app.use('/auth',authRouter)
start=async()=>{  
    try {
    
    await mongoose.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
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
} catch (e) {
    console.error('Server start error:', e);
  }}
    start()
module.exports=app
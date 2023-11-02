const express=require('express')
const mongoose=require('mongoose')
const cookieParser = require('cookie-parser');
const authRouter =require('./authRouterLog')
const app=express()
const Music=require('./model/music')
const bodyParser = require('body-parser');
// var fileupload = require("express-fileupload");
const cors = require("cors")
const path = require('path');
const multer=require('multer');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Images')
    },filename:(req,file,cb)=>{
        console.log(file)
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
})
const PORT=process.env.PORT||3000
// app.use(fileupload());
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname,'ejs'));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'ejs')));
app.use(cors());

app.use(express.json())
app.post('/auth/musiccreate',upload.single('music1'),(req, res)=>{ 
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const music = new Music({
            musicData: req.file.filename,
        });
        console.log(music)
        music.save();
        return res.status(200).json({ message: 'Music file uploaded successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
app.use('/auth',authRouter)

    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
start=async()=>{ try{

     await mongoose.connect(process.env.MONGO)
     ;
     app.get('/', (req, res) => {
        res.render('login');
    });  
    app.get('/music', (req, res) => {
        res.render('musicload');
    });  
      app.listen(PORT,()=>{console.log('server run')})
}catch(e){
        console.log(e)
    }
}
start()
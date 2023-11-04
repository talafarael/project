const Router=require('express')
const router =new Router()
const login=require('./authlogin')
const authMusicController=require('./authMusic')
const util = require('util');
const fs = require('fs');
const writeFileAsync = util.promisify(fs.writeFile);
const Music=require('./model/music')
const connect=require('./connectmongo')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const crypto=require('crypto')
const GridStream=require('gridfs-stream')
const {GridFsStorage} = require('multer-gridfs-storage');
const multer=require('multer')
const path=require('path')
dotenv.config()
let gfs=null
let storage=null
let upoloadmp3=null
const Mongo_url=process.env.MONGO
connect().then(()=>{
    const conn=mongoose.createConnection(Mongo_url)
    conn.once('open',function(){
        console.log('Connection established');
        gfs=GridStream(conn.db,mongoose.mongo)
        gfs.collection('uploads')
    })
    storage=new GridFsStorage({
        url:Mongo_url,
        file:(req,file)=>{
            return new Promise((resolve,reject)=>{
                crypto.randomBytes(16, (err,buf)=>{
                    if(err){
                        return reject(err)
                        
                    }
                    
                    const filename = buf.toString('hex') + path.extname(file.originalname);
                    
                    const fileInfo={
                        filename:filename,
                        bucketName:'uploads',
                    }
                   
                    resolve(fileInfo)
                })

            })
        }
    })
    upoload=multer({storage})

router.post('/musiccreate', upoload.single('music1'))
})
// authMusicController.musiccreate
router.get ('/getmusic',authMusicController.getmusic)
router.post('/register',login.register)
router.get ('/sendemail',login.sendemail)
router.post('/registercheck',login.registercheck)
router.post('/login',login.login)
module.exports=router
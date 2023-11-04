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
let Gfs=null
let storage
let upoloadmp3
connect().then(()=>{
    const conn=mongoose.createConnection(process.env.MONGO)
    conn.once('open',function(){
        console.log('conection ')
        Gfs=GridStream(conn.db,mongoose.mongo)
        Gfs.collection('uploads')
    })
    storage=new GridFsStorage({
        url:process.env.MONGO,
        file:(req,file)=>{
            return new Promise((resolve,reject)=>{
                crypto.randomBytes(16,(err,buff)=>{
                    if(err){
                        return reject(err)
                        
                    }
                    const fileName = buff.toString('hex') + path.extname(file.originalname);
                    const fileInfo={
                        filename:fileName,
                        bucketname:'uploads',
                    }
                    resolve(fileInfo)
                })

            })
        }
    })
    upoloadmp3=multer({storage})

router.post('/musiccreate',  (req,res)=>{
console.log(req.files)
});
})
// authMusicController.musiccreate
router.get ('/getmusic',authMusicController.getmusic)
router.post('/register',login.register)
router.get ('/sendemail',login.sendemail)
router.post('/registercheck',login.registercheck)
router.post('/login',login.login)
module.exports=router
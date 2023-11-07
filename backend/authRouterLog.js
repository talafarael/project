const Router=require('express')
const router =new Router()
const login=require('./authlogin')
const authMusicController=require('./authMusic')
const path = require('path');
const multer=require('multer');
const cors = require("cors")
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
router.post('/musiccreate',upload.single('music1'),authMusicController.musiccreate)
router.get ('/getmusic',authMusicController.getmusic)
router.post('/register',login.register)
router.get ('/sendemail',login.sendemail)
router.post('/registercheck',login.registercheck)
router.post('/login',login.login)
module.exports=router
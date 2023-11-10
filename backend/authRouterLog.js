const Router=require('express')
const router =new Router()
const login=require('./authlogin')
const authMusicController=require('./authMusic')
const path = require('path');
const multer=require('multer');
const cors = require("cors")
const autor=require('./authautor')
const upload=require('./middalewaer/multer')
const uploadimg=require('./middalewaer/multerimg')
router.post('/creatautor',uploadimg.single('autor'),autor.creatAutor)
router.post('/musiccreate',upload.single('music1'),authMusicController.musiccreate)
router.get ('/getmusic',authMusicController.getmusic)
router.post('/register',login.register)
router.get ('/sendemail',login.sendemail)
router.post('/registercheck',login.registercheck)
router.post('/login',login.login)
module.exports=router
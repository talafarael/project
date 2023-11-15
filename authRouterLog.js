const Router=require('express')
const router =new Router()
const usermiddalewaer=require('./middalewaer/user_middalewaer')
const login=require('./authlogin')
const authMusicController=require('./authMusic')
const path = require('path');
const multer=require('multer');
const cors = require("cors")
const autor=require('./authautor')
const upload=require('./middalewaer/multer')
const uploadimg=require('./middalewaer/multerimg')


router.get('/getsongs',authMusicController.getSongs)
router.post('/creatautor',uploadimg.single('autor'),autor.creatAutor)
router.post('/musiccreate',upload.single('music1'),authMusicController.musiccreate)
router.post('/music',authMusicController.getmusic)
router.post('/test',authMusicController.test)
router.post('/register',login.register)
router.get ('/sendemail',login.sendemail)
router.post('/registercheck',login.registercheck)
router.post('/login',login.login)
router.get('./getusers',login.getusers)
module.exports=router
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
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin: ".$_SERVER['HTTP_ORIGIN']);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};
router.post('/musiclike',usermiddalewaer,authMusicController.musiclike)
router.get('/getsongs',authMusicController.getSongs)
router.post('/creatautor',uploadimg.single('autor'),autor.creatAutor)
router.post('/musiccreate',upload.single('music1'),authMusicController.musiccreate)
router.post('/music',authMusicController.getmusic)
router.post('/test',authMusicController.test)
router.post('/register',login.register)
router.get ('/sendemail',login.sendemail)
router.post('/registercheck',login.registercheck)
router.post('/login',allowCrossDomain,login.login)
router.get('/getusers',login.getusers)
module.exports=router
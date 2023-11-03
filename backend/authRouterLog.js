const Router=require('express')
const router =new Router()
const login=require('./authlogin')
const authMusicController=require('./authMusic')

// router.post('/musiccreate', authMusicController.musicCreate);
router.get ('/getmusic',authMusicController.getmusic)
router.post('/register',login.register)
router.get ('/sendemail',login.sendemail)
router.post('/registercheck',login.registercheck)
router.post('/login',login.login)
module.exports=router
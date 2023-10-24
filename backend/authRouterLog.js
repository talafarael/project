const Router=require('express')
const router =new Router
const login=require('./authlogin')

router.post('/register',login.register)
router.get ('/sendemail',login.sendemail)
router.post('/registercheck',login.registercheck)
router.post('/login',login.login)
module.exports=router
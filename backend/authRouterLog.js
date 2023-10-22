const Router=require('express')
const router =new Router
const login=require('./authlogin')

router.post('/register',login.register)
router.get ('/sendemail',login.sendemail)

module.exports=router
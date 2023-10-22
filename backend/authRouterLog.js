const Router=require('express')
const router =new Router
const login=require('./authlogin')

router.post('/register',login.register)


module.exports=router
const User=require('./model/schema')
const dcrypt=require('bcryptjs')
const Emailsend = require('./email');
class authlogin{
  async register(req,res){
    try{
     const {name,email,password}=req.body
     const check=await User.findOne({email})
     if(check){
        return res.status(400).json({
            message: 'Пользователь с таким именем не существует ',
        });
     }
    const haspassword= await dcrypt.hash(password,7)
   
   return res
                    .status(200)
                    .json({ message: 'Email sent successfully' });
            
    }catch(e){
        console.error(e);
        res.status(400).json({ message: 'Registration error' });
    }
 
  }
  registercheck(){
    const user=new User({username:name,email:email,role:'user',password:haspassword})
   user.save()
  }
}
module.exports=new authlogin()
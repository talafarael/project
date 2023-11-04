const mongoose=require('mongoose')
const dotenv=require('dotenv')
const crypto=require('crypto')
dotenv.config()
const connectDB=async()=>{
try{
  await mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}catch(e){
    console.log(e)
}
}
module.exports=connectDB
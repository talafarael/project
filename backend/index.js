const express=require('express')
const mongoose=require('mongoose')
const app=express()
const PORT=process.env.PORT||3000
const authRouter =require('./authRouterLog')
app.use(express.json())
app.use('/auth',authRouter)
start=async()=>{ try{
     await mongoose.connect('mongodb+srv://farael:farae1aer@cluster0.pkknndw.mongodb.net/')
    app.listen(PORT,()=>{console.log('server run')})
}catch(e){
        console.log(e)
    }
}
start()
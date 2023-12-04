const mongoose=require('mongoose')


const Autors= new mongoose.Schema({
    img:{ type: String,},
    autor: { type: String },
    title:{type: String}
   
})
module.exports=mongoose.model('Autors',Autors)
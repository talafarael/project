const mongoose=require('mongoose')


const Autors= new mongoose.Schema({
    img:{ type: String,},
    img_autor_rigth:{ type: String,},
    img_autor_left:{ type: String,},
    autor: { type: String },
    title:{type: String}
   
})
module.exports=mongoose.model('Autors',Autors)
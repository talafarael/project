const {model,Schema}=require('mongoose')


const Songs=new Schema({
    autor:{type: String},
    songs:{type: String,uniqne:true,required: true},
    idpath:{type: String,uniqne:true,required: true},
    like:{type: Number,uniqne:true,required: true},
})
module.exports=model('Songs',Songs)
const {model,Schema}=require('mongoose')

const User=new Schema({
    username:{type: String,uniqne:true,required: true},
    email:{type: String,uniqne:true,required: true},
    password:{type: String,required: true},
    role:{type: String,uniqne:true,required: true},
    liker_songs:[],
    saveMusic:[]
    }
    
)
module.exports=model('User',User)
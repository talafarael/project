const Autors=require('./model/autor')

const fs = require('fs');
const path = require('path');
class Autor{
 async creatAutor(req,res){
    try{
      
        const {name,title}=req.body
       
       console.log(path.join(__dirname, 'img/', req.file.filename))
        const autors=new Autors({
        img:{data:path.join(__dirname, 'img/', req.file.filename),
            contentType: 'audio/mpeg'},
        autor:name,
        title:title,
       })
       await autors.save()
       console.log('all good')
       return res.status(200).json({
        redirect: '/',
    });
    }catch(e){
        console.log(e)
    }
 }
}
module.exports=new Autor()
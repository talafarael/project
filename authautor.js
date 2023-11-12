const Autors=require('./model/autor')

const fs = require('fs');
const path = require('path');
class Autor{
 async creatAutor(req,res){
    try{
      
        const {name,title}=req.body
       
       
        const autors=new Autors({
        img:{data:fs.readFileSync(path.join(__dirname, 'img/', req.file.filename)),
            contentType: 'audio/mpeg'},
        autor:name,
        title:title,
       })
       await autors.save()
       console.log('all good')
    }catch(e){
        console.log(e)
    }
 }
}
module.exports=new Autor()
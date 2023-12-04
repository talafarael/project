const Autors=require('./model/autor')

const fs = require('fs');
const path = require('path');
class Autor{
 async creatAutor(req,res){
    try{
      
        const {name,title}=req.body
    //    img:{data:fs.readFileSync(path.join(__dirname, 'img/', req.file.filename)),
    //         contentType: 'audio/mpeg'},
       console.log( req.file.path )
        const autors=new Autors({
       
        autor:name,
        img:`https://project-49di.onrender.com/${req.file.path}`,
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
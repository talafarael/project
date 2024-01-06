const Autors=require('./model/autor')


class Autor{
    async getauthor(req,res){
        try{
            const authors=await Autors.find({})
            res.status(200).json(authors)
        }catch(e){
            console.log(e)
        }
    }
 async creatAutor(req,res){
    try{
      
        const {name,title}=req.body
    //    img:{data:fs.readFileSync(path.join(__dirname, 'img/', req.file.filename)),
    //         contentType: 'audio/mpeg'},
       console.log( req.files['autor1'][0].path)
        const autors=new Autors({
       
        autor:name,
        img_autor_rigth:`https://project-49di.onrender.com/${req.files['autor2'][0].path}`,
        img_autor_left:`https://project-49di.onrender.com/${req.files['autor1'][0].path}`,
        img:`https://project-49di.onrender.com/${req.files['autor'][0].path}`,
        title:title,
       })
     
       await autors.save()
       console.log('all good')
       return res.status(200).json({
        message: 'all good',
    });
    }catch(e){
        console.log(e)
    }
 }
}
module.exports=new Autor()
const path = require('path');
const multer=require('multer');
const cors = require("cors")
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        if (file.fieldname === 'img') {
            cb(null, 'songsimg');
          } else {
            
            cb(null, 'images');
          }
    },filename:(req,file,cb)=>{
        console.log(file)
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
})

module.exports= upload;
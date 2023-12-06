const path = require('path');
const multer=require('multer');
const cors = require("cors")
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'songsimg')
    },filename:(req,file,cd)=>{
        console.log(file)
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload_Img_Songs=multer({
    storage:  storage
})

module.exports=upload_Img_Songs

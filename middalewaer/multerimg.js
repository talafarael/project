const path = require('path');
const multer=require('multer');
const cors = require("cors")
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'img')
    },filename:(req,file,cb)=>{
        console.log(file)
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
}).fields([
    { name: 'autor', maxCount: 1 },
    { name: 'autor1', maxCount: 1 },
    { name: 'autor2', maxCount: 1 },
]);

module.exports= upload;
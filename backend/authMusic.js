const util = require('util');
const fs = require('fs');
const writeFileAsync = util.promisify(fs.writeFile);
const Music=require('./model/music')
const connect=require('./connectmongo')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const crypto=require('crypto')
const GridStream=require('gridfs-stream')
const {GridFsStorage} = require('multer-gridfs-storage');
dotenv.config()
let Gfs=null
let storage

class authMusic{

   async musiccreate(req, res){ 
        try {
           
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded.' });
            }
    
            res.json({ message: 'File uploaded successfully.' });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

   async getmusic(req,res){
    try{

        const music = await Music.findOne({ name: 'ac' });
        res.json(music)
    }catch(error){
        console.error('Ошибка при сохранении музыки:', error);
        res.status(500).send('Произошла ошибка при сохранении музыки.');
    }
   }
}


module.exports = new authMusic();
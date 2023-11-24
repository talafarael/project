const util = require('util');
const fs = require('fs');
const User=require('./model/schema')
const jwt = require('jsonwebtoken');
const writeFileAsync = util.promisify(fs.writeFile);
const Music = require('./model/music');
const path = require('path');
const Songs = require('./model/song');
const Autors=require('./model/autor')
class authMusic {
    async  musiclike(req, res) {
        try {
            const { like_id } = req.body;
            const token = req.cookies.token;
            const decodedData = await jwt.verify(token, process.env.secret);
            const id = decodedData.id;
    
            const user = await User.findById(id);
            const song = await Songs.findById(like_id);
    
            if (!user || !song) {
                return res.status(404).json({ error: 'Користувач або пісню не знайдено' });
            }
    
            if (user.liker_songs.includes(like_id)) {
                user.liker_songs.pull(like_id);
                song.like -= 1;
            } else {
                user.liker_songs.push(like_id);
                song.like += 1;
            }
    
            await user.save();
            await song.save();
    
            return res.status(200).json({ message: 'Музичний файл успішно оновлено.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Внутрішня помилка сервера' });
        }
    }
    
    async musiccreate(req, res) {
        try {
            const { name } = req.body;
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded.' });
            }

            const music = new Music({
                data: fs.readFileSync(
                    path.join(__dirname, 'images/', req.file.filename)
                ),
                contentType: 'audio/mpeg',
            });

            const songs = new Songs({
                autor: '',
                songs: name,
                idpath: music._id,
                like:0
            });
            songs.save();

            music.save();

            return res
                .status(200)
                .json({ message: 'Music file uploaded successfully.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getSongs(req,res){
        try{
            const {autor}=req.body
            
            const autors=await Autors.find({  autor:autor})
           const music = await Songs.find({autor:autor});
           const arr={
            'autors':autors,
            'music':[music]
           }
           console.log(arr)
            res.json(arr);
        }catch(e){
            console.error('Ошибка при сохранении музыки:', e);
            res.status(500).send('Произошла ошибка при сохранении музыки.');
        }
        }
   
    async getmusic(req, res) {
        try {
            const {id}=req.body
            console.log(id)
            const songs = await Songs.findOne({ _id:id});
            
            const music = await Music.findOne({ _id:songs.idpath});
            console.log(songs)
            res.json({music,songs});
        } catch (error) {
            console.error('Ошибка при сохранении музыки:', error);
            res.status(500).send('Произошла ошибка при сохранении музыки.');
        }
    }
    async test(req,res){
        try{
            const {mus}=req.body
            console.log(mus)
        }catch(error) {
            console.error('Ошибка при сохранении музыки:', error);
            res.status(500).send('Произошла ошибка при сохранении музыки.');
        }
    }
}

module.exports = new authMusic();

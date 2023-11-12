const util = require('util');
const fs = require('fs');
const writeFileAsync = util.promisify(fs.writeFile);
const Music = require('./model/music');
const path = require('path');
const Songs = require('./model/song');
class authMusic {
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
            const songs=await Songs.find()
            res.json(songs);
        }catch(e){
            console.error('Ошибка при сохранении музыки:', e);
            res.status(500).send('Произошла ошибка при сохранении музыки.');
        }
        }
   
    async getmusic(req, res) {
        try {
            const {data}=req.body
            console.log(data)
            const music = await Music.findOne({ _id:data});
            console.log(music)
            res.json(music);
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

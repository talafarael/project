const util = require('util');
const fs = require('fs');
const writeFileAsync = util.promisify(fs.writeFile);
const Music=require('./model/music')

class authMusic{

   async musicCreate(req, res) {
    const musicFile = req.files.music1; // Обратите внимание, что это поле 'music1' соответствует ключу, который вы указали в FormData
    const contentType = musicFile.mimetype;
console.log(contentType)
    try {
        const buffer = musicFile.data; // Получение буфера данных файла

        
        const music = new Music({
            musicData: buffer,
            contentType: contentType,
            nema:'fafa'
        });

        await music.save();

        console.log('Музыка успешно сохранена в базе данных.');
        res.status(200).send('Музыка успешно сохранена в базе данных.');
    } catch (error) {
        console.error('Ошибка при сохранении музыки:', error);
        res.status(500).send('Произошла ошибка при сохранении музыки.');
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
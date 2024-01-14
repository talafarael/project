const util = require('util');
const fs = require('fs');
const User = require('./model/schema');
const jwt = require('jsonwebtoken');
const writeFileAsync = util.promisify(fs.writeFile);
const Music = require('./model/music');
const path = require('path');
const Songs = require('./model/song');
const Autors = require('./model/autor');
class authMusic {
    async musicLike(req, res) {
        try {
            const { idlike, token } = req.body;

            const decodedData = await jwt.verify(token, process.env.SECRET);
            const id = decodedData.id;

            const user = await User.findById(id);
            const trimmedId = idlike.trim();
            console.log(idlike);
            const song = await Songs.findById(trimmedId);

            if (!user || !song) {
                return res
                    .status(404)
                    .json({ error: 'Користувач або пісню не знайдено' });
            }

            if (user.liker_songs.includes(idlike)) {
                user.liker_songs.pull(idlike);
                song.like -= 1;
            } else {
                user.liker_songs.push(idlike);
                song.like += 1;
            }

            await user.save();
            await song.save();

            return res
                .status(200)
                .json({ message: 'Музичний файл успішно оновлено.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Внутрішня помилка сервера' });
        }
    }

    async musiccreate(req, res) {
        try {
            const { name } = req.body;

            // const music = new Music({
            //     data: fs.readFileSync(
            //         path.join(__dirname, 'images/', req.file.filename)
            //     ),
            //     contentType: 'audio/mpeg',
            // });
            console.log(req.files['img'][0].path);
            const songs = new Songs({
                autor: 'ПЕС ПАТРОН!!!',
                songs: name,
                img_autor: `https://project-49di.onrender.com/${req.files['img'][0].path}`,
                idpath: `https://project-49di.onrender.com/${req.files['music1'][0].path}`,
                like: 0,
            });
            songs.save();

            // music.save();

            return res
                .status(200)
                .json({ message: 'Music file uploaded successfully.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    async get_Songs_For_autor(req, res) {
        try {
            const { autor, token } = req.body;
            if (token) {
                const decodedData = await jwt.verify(token, process.env.SECRET);
                const id = decodedData.id;
                const id_User = id.trim();
                console.log(id_User);
                const user = await User.findById(id_User);
                console.log(user);
                const music = await Songs.find({ autor: autor });
                return res.json({ music, user });
            }

            const music = await Songs.find({ autor: autor });
            return res.json({ music });
        } catch (e) {
            console.error('Ошибка при сохранении музыки:', e);
            res.status(500).send('Произошла ошибка при сохранении музыки.');
        }
    }
    async getSongs(req, res) {
        try {
            const { autor } = req.body;

            const autors = await Autors.find({ autor: autor });

            const arr = {
                autors: autors,
            };
            console.log(arr);
            res.json(arr);
        } catch (e) {
            console.error('Ошибка при сохранении музыки:', e);
            res.status(500).send('Произошла ошибка при сохранении музыки.');
        }
    }
    async get_Songs_For_Creat_Mainpage(req, res) {
        try {
            const music = await Songs.find().limit(5);
            console.log('afa');
            const autor = await Autors.find().limit(5);

            const arr = {
                music: music,
                autor: autor,
            };
            console.log(arr);
            return res.status(200).json({ arr });
        } catch (error) {
            console.error('Ошибка при сохранении музыки:', error);
            res.status(500).send('Произошла ошибка при сохранении музыки.');
        }
    }
    async getSearchmusic(req, res) {
        try {
            const {value}=req.body
            console.log(value)
            const musics = await Songs.find({ songs: { $regex: value, $options: 'i' } });
            const author= await Autors.find({ autor: { $regex: value, $options: 'i' } });
            const find={author:author,musics:musics}
            res.json(find);
        } catch (error) {
            console.error('Ошибка при сохранении музыки:', error);
            res.status(500).send('Произошла ошибка при сохранении музыки.');
        }
    }
    async getmusic(req, res) {
        try {
            const { id } = req.body;
            console.log(id);
            const songs = await Songs.findOne({ _id: id });

            const music = await Music.findOne({ _id: songs.idpath });
            console.log(songs);
            res.json({ music, songs });
        } catch (error) {
            console.error('Ошибка при сохранении музыки:', error);
            res.status(500).send('Произошла ошибка при сохранении музыки.');
        }
    }
    async test(req, res) {
        try {
            const { mus } = req.body;
            console.log(mus);
        } catch (error) {
            console.error('Ошибка при сохранении музыки:', error);
            res.status(500).send('Произошла ошибка при сохранении музыки.');
        }
    }
}

module.exports = new authMusic();

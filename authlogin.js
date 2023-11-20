const User = require('./model/schema');
const bcrypt = require('bcryptjs');
const Emailsend = require('./emailsend');
const tempData = require('./cahce');
const emailSender = new Emailsend();
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const generateAccessToken = (id) => {
    const playold = {
        id,
    };
    return jwt.sign(playold, process.env.SECRET, { expiresIn: '24h' });
};
class authlogin {
    async getusers(req,res){
        try{
            const users=await User.find()
            res.json(users);
        }catch(e){
            console.error('Ошибка при сохранении музыки:', e);
            res.status(500).send('Произошла ошибка при сохранении музыки.');
        }
        }
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const check = await User.findOne({ email });
            if (check) {
                return res.status(400).json({
                    message: 'Пользователь с таким именем не существует ',
                });
            }
            const hashpassword = await bcrypt.hash(password, 7);
            const status = false;
            tempData.setTempData(
                'registrationData',
                { name, email, hashpassword, status },
                30 * 60 * 1000
            );

            return res.status(200).json({ message: 'Email sent successfully' });
        } catch (e) {
            console.error(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }
    async sendemail(req, res) {
        try {
            const data = tempData.getTempData('registrationData');

            const status = data.status;
            console.log(data)
            if (!status) {
                const emailUser = data.email;

                const num = Math.floor(Math.random() * 1000);
                await emailSender.sendmessage({
                    emailUser: emailUser,
                    num: num.toString(),
                });

                const newstatus = true;
                const name = data.name;
                const email = data.email;
                const hashPassword = data.hashpassword;

                tempData.setTempData(
                    'registrationData',
                    {
                        name: name,
                        email: email,
                        hashpassword: hashPassword,
                        status: newstatus,
                        num:num
                    },
                    30 * 60 * 1000
                );
            }

            console.log('Email sent successfully');
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (e) {
            console.error(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }
    
    async registercheck(req, res) {
        try {
            const data = tempData.getTempData('registrationData');
            const num =data.num
            const newstatus = true;
            const name = data.name;
            const email = data.email;
            const hashPassword = data.hashpassword;
            

            const { password } = req.body;
            const status = data.status;

            if (password == num) {
                console.log(name);
                const user = new User({
                    username: name,
                    email: email,
                    role: 'user',
                    liker_songs:[],
                    password: hashPassword,
                });
                user.save();
                return res.status(200).json({
                    redirect: '/index',
                });
            }
            console.log(data);
            tempData.setTempData(
                'registrationData',
                {
                    name: name,
                    email: email,
                    hashpassword: hashPassword,
                    status: status,
                    num:num,
                },
                30 * 60 * 1000
            );

            return res.status(400).json({
                message: 'не верный пароль',
            });
        } catch (e) {
            console.error(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }
    async login(req,res){
        try{
           const {email,password} =req.body
           const user=await User.findOne({email})
           if (!user) {
            return res.status(400).json({
                message: 'Пользователь с таким именем не существует ',
            });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res
                .status(400)
                .json({ message: `Введен неверный пароль` });
        }
        const token = generateAccessToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 86400 * 1000,
            sameSite: 'None', 
            secure: true 
        });
        header('Access-Control-Allow-Credentials: true')
        return res.status(200).json({
            message:"token creat"
        });
        }catch(e){
            console.error(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }
}
module.exports = new authlogin();

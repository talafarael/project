
const User=require('../model/schema')
const jwt = require('jsonwebtoken');
module.exports=async function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.cookies.token
    const decodedData = await jwt.verify(token,process.env.secret);
            const id = await decodedData.id;
            const users = await User.findById(id);
            if(users){next()}
            
        } catch (e) {
            console.log(e);
            return res.status(403).json({ message: 'Пользователь не авторизован' });
        }
    };
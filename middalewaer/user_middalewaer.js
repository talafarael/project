
const User=require('../model/schema')
const jwt = require('jsonwebtoken');
module.exports = async function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
        return;
    }

    try {
        const { token } = req.body;
        if (!token) {
            return res.status(403).json({ message: 'Токен не предоставлен' });
        }

        const decodedData = await jwt.verify(token, process.env.SECRET);
        
        
        const id = decodedData.id;
        console.log(id)
        const user = await User.findById(id);

        if (user) {
            next();
        } else {
            return res.status(403).json({ message: 'Пользователь не найден' });
        }
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
};
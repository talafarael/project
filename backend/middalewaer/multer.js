const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'musci1/'); // Директорія для зберігання завантажених файлів
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Генеруємо унікальне ім'я для файлу
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

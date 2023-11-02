const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    musicData: {
        type: Buffer,
        required: true,
        data: Buffer,

    },
	
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
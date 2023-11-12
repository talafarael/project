const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  
        data: Buffer,
        contentType: String,
    
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;

const { Schema, model } = require('mongoose');

const PhotoSchema = Schema({
    publishDateAndType:{ //YYYY-MM-DD-TYPE
        type: String,
        required: true
    },
    publishDate: { //YYYY-MM-DD
        type: String,
        required: true
        //unique: true
    },
    type: {  // NASA, EPIC, MARS
        type: String,
        required: true
    },
    likeDate: { //YYYY-MM-DD
        type: String,
        required: true
    }
});

module.exports = model('Photo', PhotoSchema);
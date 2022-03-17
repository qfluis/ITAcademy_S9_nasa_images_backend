const { Schema, model } = require('mongoose');

const LikeSchema = Schema({
    publishDateAndTypeAndEmail:{ //YYYY-MM-DD-TYPE-email
        type: String,
        required: true
    },
    email: {    // luis@gmail.com
        type:String,
        required:true
    },
    publishDate: { //YYYY-MM-DD
        type: String,
        required: true
        //unique: true
    },
    type: {  // NASA, EPIC, MARS
        type: String,
        required: true
    }
    /*likeDate: { //YYYY-MM-DD
        type: String,
        required: true
    }*/
});

module.exports = model('Like', LikeSchema);
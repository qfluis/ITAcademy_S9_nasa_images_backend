const { response } = require('express');
const { db } = require('../models/Like');
const Like = require('../models/Like');

const newLike = async (req, res = response) =>{
    const { publishDate, type, email } = req.body;
    const publishDateAndTypeAndEmail = publishDate + "-" + type +"-"+ email;
    req.body.publishDateAndTypeAndEmail = publishDateAndTypeAndEmail;

    if( await searchLike(publishDateAndTypeAndEmail)){
        // no está en BD
        return res.status(200).json({
            ok: false,
            msg: "Like already exists"
        })
    }

    const dbLike = new Like( req.body );    
    await dbLike.save();    

    // Generar respuesta exitosa
    return res.status(201).json({
        ok: true,
    })
    
}

const removeLike = async (req, res = response) => {

    const { publishDate, type, email } = req.body;
    const publishDateAndTypeAndEmail = publishDate + "-" + type +"-"+ email;
    
    const resp = await Like.findOneAndDelete({ publishDateAndTypeAndEmail });
    
    console.log(resp);

    if( resp ){

        // Eliminado con exito
        return res.status(200).json({
            ok: true,
        });
        
    } else {

        return res.status(200).json({
            ok: false,
            msg: "This like don't exist in DB"
        })

    }
}

const hasLike = async (req, res = response) => {
    const { publishDate, type, email } = req.body;
    console.log("HASLIKE", publishDate, type, email);
    
    const publishDateAndTypeAndEmail = publishDate + "-" + type +"-"+ email;
    const resp = await Like.findOne({ publishDateAndTypeAndEmail });

    if(resp){
        return res.status(200).json({
            ok: true,
            msg: "Image has like"
        })
    } else {
        return res.status(200).json({
            ok: false,
            msg: "Image hasn't like"
        })
    }
    
}

const likeList = async (req, res = response) => {
    const { email } = req.body;
    console.log("LIKE LIST", email);

    const resp = await Like.find( {email} )
    console.log(resp.length);

    if( resp.length > 0 ){
        return res.status(200).json({
            ok: true,
            data: resp
        });        
    } else {

        return res.status(200).json({
            ok: false,
            msg: "No data"
        })
    }
}



// TODO: refactorizar y eliminar función
const searchLike = async (publishDateAndTypeAndEmail) => {
    const result = await Like.findOne({ publishDateAndTypeAndEmail });
    console.log(result);
    if(result){
        return true;
    } else {
        return false;
    }
}


module.exports = {
    newLike, removeLike, likeList, hasLike
};


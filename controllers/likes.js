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

/*
const loginUser = async (req, res = response) =>{    
    console.log("Inicio");
    const { email, password } = req.body;

    try {

        const user = await User.findOne({email});
        // ¿Existe el usuario?
        if( !user ){
            return res.status(200).json({
                ok:false,
                msg:'credenciales no válidas'
            });
        }
        // confirmar match del password
        const validPassword = bcrypt.compareSync( password, user.password );
        if (!validPassword){
            return res.status(200).json({
                ok:false,
                msg:'credenciales no válidas'
            });
        }
        // Generar JWT
        const token = await generarJWT(user.id, user.email );
        // Respuesta del servicio
        console.log("Fin");
        return res.json({
            ok: true,
            uid: user.id,
            email: user.name,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

const newUser = async (req, res = response) =>{   
    console.log("Inicio");
    const { email, password } = req.body;
    try {
        // verificar el email
        const user = await User.findOne({ email });

        if( user ) {
            return res.status(200).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }
        
        // Crear usuario con el modelo
        const dbUser = new User( req.body );
        // Hashear password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );
        // Generar JWT
        const token = await generarJWT( dbUser.id, dbUser.email );
        // Crear usuario en BD
        await dbUser.save();

        console.log("Fin");
        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            email,
            token
        })

    } catch (error) {
        return res.status(500).json({  // Error interno
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }    
}

const renewToken = async (req, res = response) =>{     
    
    const { uid, email } = req;    

    // Generar JWT
    const token = await generarJWT( uid, email );

    return res.json({
        ok: true,
        uid: uid,
        email,
        token      
    });
}*/


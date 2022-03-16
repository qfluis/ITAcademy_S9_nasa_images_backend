const { response } = require('express');
const { db } = require('../models/Photo');
const Photo = require('../models/Photo');

const newLike = async (req, res = response) =>{
    console.log("Registrando like");
    const { publishDate, type, likeDate } = req.body;
    const publishDateAndType = publishDate + "-" + type;
    req.body.publishDateAndType = publishDateAndType;

    const dbUser = new User( req.body );    
    await dbUser.save();

    console.log("Fin like");

    // Generar respuesta exitosa
    return res.status(201).json({
        ok: true,
        uid: dbUser.id,
        email,
        token
    })

}


module.exports = {
    newLike
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


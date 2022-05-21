const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(200).json({ // 401
            ok: false,
            msg: 'error en el token'
        })
    }

    try {
        const { uid, email } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        req.uid = uid;
        req.email = email;

    } catch (error) {
        return res.status(200).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    // todo ok
    next()
}

module.exports = {
    validarJWT
}
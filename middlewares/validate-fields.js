const { response } = require("express");
const { validationResult } = require("express-validator");

const validateFields = (req, res = response, next) => {
    console.log("Validando");
    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        return res.status(200).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    console.log("validado");
    next();
}

module.exports = {
    validateFields
}
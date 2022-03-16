const { Router } = require('express');
const { check } = require('express-validator');
const { newLike } = require('../controllers/likes')
const { validateFields } = require('../middlewares/validate-fields');


const router = Router(); 

// Nuevo Like
router.post('/new',[
    check('publishDate', 'publishDate error').isAlphanumeric,
    check('type', 'type error').isAlphanumeric,
    check('likeDate', 'likeDate error').isAlphanumeric,
    validateFields        
], newLike);


/*
// Login usuario
router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    validateFields        
], loginUser);

// Nuevo usuario
router.post('/new',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    validateFields
], newUser );

// Validar & revalidar token
router.get('/renew', validarJWT, renewToken);
*/

module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { loginUser, newUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

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

module.exports = router;
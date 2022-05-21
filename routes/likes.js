const { Router } = require('express');
const { check } = require('express-validator');
const { newLike, removeLike, likeList, hasLike } = require('../controllers/likes')
const { validateFields } = require('../middlewares/validate-fields');


const router = Router(); 
// TODO: validar JWT ¿?
// Nuevo Like

router.post('/new',[
    check('publishDate', 'publishDate error').isLength({ min:1 }),
    check('type', 'type error').isLength({ min:1 }),    
    check('email', 'email error').isEmail(),
    validateFields        
], newLike);

router.post('/remove',[
    check('publishDate', 'publishDate error').isLength({ min:1 }),
    check('type', 'type error').isLength({ min:1 }),    
    check('email', 'email error').isEmail(),
    validateFields
], removeLike);

router.post('/haslike',[
    check('publishDate', 'publishDate error').isLength({ min:1 }),
    check('type', 'type error').isLength({ min:1 }),    
    check('email', 'email error').isEmail(),
    validateFields
], hasLike);

router.post('/list', [
    check('email', 'email error').isEmail(),
    validateFields
], likeList);




module.exports = router;
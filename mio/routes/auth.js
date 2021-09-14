const {Router} = require('express');
const { check, validationResult } = require('express-validator/check');
const { crearusuario, loginusuario, revalidarToken } = require('../controllers/auth');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


// crear un nuevo usuario
router.post('/new', [
    check('email', 'El email es obligatorio').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').isLength({min:6}),
    validarcampos

],crearusuario);


    //login usuario
    router.post( '/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').isLength({min:6}),
        validarcampos

    ], loginusuario );
    
//validar y revalidar token 
router.get('/renew',validarJWT,revalidarToken);






module.exports = router;
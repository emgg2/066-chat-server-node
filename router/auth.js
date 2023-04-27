// path:api/login

const { Router } = require('express');
const { createUser, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { CheckFields } = require('../middlewares/check-fields');

const router = Router();

//create new user
router.post( '/new', [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('password', 'Password is mandatory').not().isEmpty(),
    check('email', 'Email is mandatory').not().isEmpty(),
    check('email', 'Email wrong').isEmail(),
    CheckFields
],createUser )
/**
 * 
 * nombre: string
 * password, string not null
 * email: is email
 * 
 * 
 * 
 */


// si se mandan 3 argumentos el segundo seria un middleware propio de esta ruta, dispararía algo antes de lanzar el login, el controlador definido
// si se ponen [] es pq vamos a definir más de uno
// check es la funcion para validar
// en CheckFields automaticamente express le pasa dos parametros, req, res, next (hay que llamarla para decirle que está todo bien) Si no está bien next detiene la ejecución

router.post( '/',[
    check ('email', 'Email wrong').isEmail(),
    check ('email', 'Email is mandatonry').not().isEmpty(),
    check ('password', 'Password is mandatory').not().isEmpty(),
    CheckFields
] ,login )

router.get( '/renewToken', renewToken )






module.exports = router;
/* 
    Path: api/messages
*/
const { Router }    = require ( 'express');
const { checkJWT }  = require('../middlewares/chek-jwt');
const { getChat }   = require('../controllers/getChat');

const router = Router();

router.get('/:from', checkJWT, getChat )

module.exports = router;
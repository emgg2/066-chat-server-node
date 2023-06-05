
const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {

    return new Promise (( resolve, reject) => {
        // cuanto menos datos mejor, más seguridad
        const payload = { uid }        
        jwt.sign ( payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if( err ) {
                reject('JWT couldn´t be generate ');
                console.err(err);
            } else
            {
                resolve ( token );
            }

        } )
    })

}

const checkJWT = (token='') => {
    try {
        const { uid } = jwt.verify ( token, process.env.JWT_KEY );
        return [ true, uid ];
    } catch (error) {

        return [ false, null ];
    }
}

module.exports = { 
    generateJWT,
    checkJWT
 }

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

module.exports = { 
    generateJWT
 }
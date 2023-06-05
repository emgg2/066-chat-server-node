
const jwt = require('jsonwebtoken');

const checkJWT = ( req, res, next ) => {
    
    try {

        const token = req.header('x-token');

        if( !token ) {
            return res.status(401).json({
                ok: false,
                msg: 'Missing token in the request'
            })
        }
       
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;
        

        next();
        
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        })
        
    }

}


module.exports = {
    checkJWT
}
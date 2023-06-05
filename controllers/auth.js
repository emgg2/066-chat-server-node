const { response }          = require("express")
const { validationResult }  = require("express-validator");
const bcrypt                = require('bcryptjs');
const User                  = require("../models/user");
const { generateJWT }       = require("../helpers/jwt");


const createUser = async(req, res = response) => {
  try {

    const { email, password } = req.body;
    const emailExist = await User.findOne({ email });

    //Verificar si el email existe
    if( emailExist ){
        return res.status(400).json({
            ok: false,
            msg: "Email already exists"

        })
    }

    const user = new User( req.body );
   // encryp password
   const salt = bcrypt.genSaltSync();
   user.password = bcrypt.hashSync(password, salt)



   // Save user in BD
   await user.save();

   // Generar JWT
   const token = await generateJWT ( user.id );
    

    res.json({
        ok:true,
        user,
        token
    })
    
  } catch (error) {
    //Error interno 
    console.log(error)
    res.status(500).json({
        ok: false,
        msg: "Talk to administrator"
    });
    
  }
}

const login = async(req, res) => {
   
    const { email, password } = req.body;
    

    try {
        // verify email
        
        const userBD = await User.findOne({ email });
        if( !userBD ) {
            return res.status(404).json({
                ok:false,
                msg: 'Email not found'

            });
        }
        //validar password
        const validPassword = bcrypt.compareSync( password, userBD.password );
        if( !validPassword) {
            return res.status(404).json({
                ok:false,
                msg: 'Invalid Password'

            });
        }

        const token = await generateJWT( userBD.id );
        res.json({
            ok: true,
            user: userBD,
            token
       
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Talk to administrator"
        });
        
    }


}

const renewToken = async(req, res) => {

    const uid = req.uid;

    // Generate a new JWT
    const token = await generateJWT( uid );

    // Get User by uid
    const user = await User.findById(uid);

    res.json({
        ok: true,
        user,
        token
    })
}

module.exports = {
    createUser, 
    login,
    renewToken
}
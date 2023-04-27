const { response }          = require("express")
const { validationResult }  = require("express-validator");
const bcrypt                = require('bcryptjs');
const User                  = require("../models/user");


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
    

    res.json({
        user
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

    res.json({
        ok: true,
        msg: 'login',
        email, 
        password
    })
}

const renewToken = async(req, res) => {
    res.json({
        ok: true,
        msg: 'renew Token'
    })
}

module.exports = {
    createUser, 
    login,
    renewToken
}
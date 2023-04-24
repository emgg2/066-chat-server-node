const { Schema, model } = require('mongoose'); 

//qué campos vamos a guardar, como las columnas en bbdd relacional
const UserSchema = Schema({
    name:{
        type: String, 
        require: true
    },
    email:{
        type: String, 
        require: true,
        unique: true

    },
    password:{
        type: String, 
        require: true
    },
    online:{
        type: Boolean, 
        default: false
    }


});

// Vamos a sobreescribir el metodo toJSON
// es una función normal, NO una de flecha que sino no funciona
UserSchema.method('toJSON', function() {
    //esto va a extraer la version __v , _id el id de usuario que mongoose le da por defecto, el password pq no nos interesa que se imprima el password y el resto (name, email, online) lo metemeos en object 
    const{ __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('User', UserSchema);
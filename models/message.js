const { Schema, model } = require('mongoose'); 

//qué campos vamos a guardar, como las columnas en bbdd relacional
const MessageSchema = Schema({
    from:{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        require: true
    },
    to:{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        require: true
    },
    message: {
        type: String,
        require: true
    }
    


}, {
    timestamps: true
});

// Vamos a sobreescribir el metodo toJSON
// es una función normal, NO una de flecha que sino no funciona
MessageSchema.method('toJSON', function() {
    //esto va a extraer la version __v , _id el id de usuario que mongoose le da por defecto, el password pq no nos interesa que se imprima el password y el resto (name, email, online) lo metemeos en object 
    const{ __v, _id, ...object } = this.toObject();
    return object;
})

module.exports = model('Message', MessageSchema);
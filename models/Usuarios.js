const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usuariosSchema = new Schema({
    email: {
        type: String,
        trim: true,
        uniqie: true,
        lowercase: true
    },
    nombre: {
        type: String,
        required: 'Agrega tu nombre'
    },
    password: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Usuarios', usuariosSchema)
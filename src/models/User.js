const mongoose = require('mongoose')
const userCadastro = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    email_confirm: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    password_confirm:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userCadastro)

// CRIANDO SHEMA
const mongoose = require('mongoose')

const shema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    }, descricao: {
        type: String,
        required: true
    }
    
}, { timestamps: true })

//CRIANDO MODELO PRA COLLECTION (entidade/model)
const FormaPagamento = mongoose.model('formapagamento', shema)

// EXPORTANDO MÓDULO
module.exports = FormaPagamento
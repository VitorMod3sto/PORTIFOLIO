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
const Categoria = mongoose.model('categoria', shema)

// EXPORTANDO MÓDULO
module.exports = Categoria
// CRIANDO SHEMA
const mongoose = require('mongoose')

const shema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    }, descricao: {
        type: String,
        required: true
    }, marca: {
        type: String,
        required: true
    }, categoria: {
        type: mongoose.Types.ObjectId,
        ref: 'categoria',
        required: true
    }, tamanho: {
        type: String,
        required: true
    }, preco: {
        type: String,
        required: true
    }

}, { timestamps: true })

//CRIANDO MODELO PRA COLLECTION (entidade/model)
const Produtos = mongoose.model('produto', shema)

// EXPORTANDO MÓDULO
module.exports = Produtos
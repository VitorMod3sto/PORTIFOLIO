// CRIANDO SHEMA
const mongoose = require('mongoose')

// primeira {} é a definição e depois a {} de opções
const shema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    }, descricao: {
        type: String,
        required: true
    }, categoria: {
        type: mongoose.Types.ObjectId,
        ref: 'categoria',
        required: true
    }

    // timestamps cria duas variáveis, uma para armazenar a criação do registro e uma para data de atualização
}, { timestamps: true })

//CRIANDO MODELO PRA COLLECTION (entidade/model)
const Subcategoria = mongoose.model('subcategoria', shema)

// EXPORTANDO MÓDULO
module.exports = Subcategoria
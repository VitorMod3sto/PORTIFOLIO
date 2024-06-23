// CRIANDO SHEMA
const mongoose = require('mongoose')

// primeira {} é a definição e depois a {} de opções
const shema = new mongoose.Schema({
    nome: {
        type: String,
        required: true

    }, email: {
        type: String,
        required: true

    }, telefone: {
        type: String,
        required: true

    }, senha: {
        type: String,
        required: true

    }, endereco: {
        cep: String,
        uf: String,
        localidade: String,
        bairro: String,
        numero: String,
        complemento: String

    }, dataNascimento: {
        type: Date,
        required: true
    }

    // timestamps cria duas variáveis, uma para armazenar a criação do registro e uma para data de atualização
}, { timestamps: true })

//CRIANDO MODELO PRA COLLECTION (entidade/model)
const Cliente = mongoose.model('cliente', shema)

// EXPORTANDO MÓDULO
module.exports = Cliente



    
// CRIANDO SHEMA
const mongoose = require('mongoose')

// primeira {} é a definição e depois a {} de opções
const shema = new mongoose.Schema({
    cliente: {
        type: mongoose.Types.ObjectId,
        ref: 'cliente',
        required: true

    }, produto: {
        type: mongoose.Types.ObjectId,
        ref: 'produto',
        required: true

    }, quantidade: {
        type: Number,
        required: true,

    }, dataPedido: {
        type: Date

    }, pagamento: {
        type: mongoose.Types.ObjectId,
        ref: 'formapagamento',
        required: true

    }, valorTotal: {
        type: Number, // Adicionado campo para armazenar o valor total como um número
        required: true
    }

    // timestamps cria duas variáveis, uma para armazenar a criação do registro e uma para data de atualização
}, { timestamps: true })

//CRIANDO MODELO PRA COLLECTION (entidade/model)
const Pedido = mongoose.model('pedido', shema)

// EXPORTANDO MÓDULO
module.exports = Pedido
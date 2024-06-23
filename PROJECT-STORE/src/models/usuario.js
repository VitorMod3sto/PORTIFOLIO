// SHEMAS 
const mongoose = require('mongoose')
// primeira {} é a definição e depois a {} de opções
const shema = new mongoose.Schema({
nome: {
    type:String,
    required:true

}, email:{
    type:String,
    required:true

}, senha:{
    type:String,
    required:true
}

// timestamps cria duas variáveis, uma para armazenar a criação do registro e uma para data de atualização
},{timestamps:true})

//CRIANDO MODELO PRA COLLECTION (entidade/model)
const Usuario = mongoose.model('usuario', shema)

// EXPORTANDO MÓDULO
module.exports=Usuario


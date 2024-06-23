// IMPORTANDO BIBLIOETCA MONGOOSE
const mongoose = require('mongoose')

// IMPORTANDO O DOTENV COM MÉTODO CONFIG
require('dotenv').config()

// FAZENDO A CONEXÃO COM BD (usando variáveis de ambiente)
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME

// CRIANDO FUNÇÃO DE CONEXÃO COM O BD
function main() {
    // Importando os dados de usuário pelas variáveis de ambiente
    // Substitui os dados no script por variáveis de ambiente
    // ele tenta fazer a conexão como promessa, na qual pode retornar then para certo e catch para errado a conexão
    mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`)
        // caso dê certo
        .then(() => console.log("conectado ao MongoDb"))
        // caso dê errado
        .catch(err => console.log("Erro ao conectar no MongoDb: ", err))
}

// EXPORTANDO FUNÇÃO
module.exports = main
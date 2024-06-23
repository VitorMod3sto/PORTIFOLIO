// IMPORTS
const express = require('express')

// CONFIGURAÇÃO
const PORT = 3000
const app = express()

// IMPORTANDO A FUNÇÃO DE CONEXÃO COM O BD
const DBconnect = require('./database/connection')
DBconnect()

// MIDDLEWARES
app.use(express.json())



// AUTENTICAÇÃO ROTAS
const autenticacaoRoutes = require('../src/routes/autenticacao.routes')
app.use(autenticacaoRoutes)

// IMPORTANDO VALIDADOR
const {checkToken} = require('./validators/autenticacaoValidator')

// IMPORTANDO AS ROTAS
const routes = require('./routes/routes')
app.use(checkToken, routes) 

// START
app.listen(PORT, () => {
    console.log(`aplicação rodando na porta ${PORT}`)
})

const express = require('express')
const router = express.Router()

// IMPORTANDO O CONTROLLER "Controlador de Autenticacao" (INTERMEDIÁRIO)
const autenticacaoController = require('../controllers/autenticacaoController')

// IMPORTANDO O VALIDADOR "Validador de Autenticacao" (INTERMEDIÁRIO)
const { validarUsuario, validarLogin } = require('../validators/autenticacaoValidator')

// ROTAS PARA REGISTRAR E FAZER LOGIN DE CLIENTES
router.post('/auth/registrar', validarUsuario, autenticacaoController.registrar)
router.post('/auth/login', validarLogin, autenticacaoController.login)

module.exports = router
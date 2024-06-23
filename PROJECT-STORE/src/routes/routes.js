// IMPORTS
const express = require('express')

// CRIANDO ROTEADOR
const router = express.Router()

// IMPORTANDO CONTROLLERS(INTERMEDIÁRIOS)
const clienteController = require('../controllers/clienteController')
const categoriaController = require('../controllers/categoriaController')
const subCategoriaController = require('../controllers/subCategoriaController')
const formaPagamentoController = require('../controllers/formaPagamentoController')
const produtoController = require('../controllers/produtosController')
const pedidoController = require('../controllers/pedidoController')


// IMPORTANDO VALIDADORES (INTERMEDIÁRIO)
const { validarCliente } = require('../validators/ClienteValidator')
const { validarLogin } = require('../validators/ClienteValidator')
const { validarId } = require("../validators/IdValidator")
const {validarCategoria} = require("../validators/categoriaValidator")
const {validarSubcategoria} = require("../validators/SubcategoriaValidator")
const {validarFormaPagamento} = require("../validators/formaPagamentoValidator")
const {validarProduto} = require("../validators/produtoValidator")
const {validarPedido} = require("../validators/pedidoValidator")


// ROTAS DE CLIENTES
router.post('/clientes', validarCliente, clienteController.registrar)
router.post('/login', validarLogin, clienteController.login)
router.get('/clientes', clienteController.buscarTodos)
router.get('/clientes/:id', validarId, clienteController.buscarPorId)
router.put('/clientes/:id', validarId, validarCliente, clienteController.atualizar)
router.delete('/clientes/:id', validarId, clienteController.excluir)

// ROTAS DE CATEGORIAS
router.post('/categorias', validarCategoria, categoriaController.criar)
router.get('/categorias', categoriaController.buscarTodos)
router.get('/categorias/:id', validarId, categoriaController.buscarPorId)
router.put('/categorias/:id', validarId, validarCategoria, categoriaController.atualizar)
router.delete('/categorias/:id', validarId, categoriaController.excluir)

// ROTAS DE SUBCATEGORIAS
router.post('/subcategorias', validarSubcategoria, subCategoriaController.criar)
router.get('/subcategorias', subCategoriaController.buscarTodos)
router.get('/subcategorias/:id', validarId, subCategoriaController.buscarPorId)
router.put('/subcategorias/:id', validarId, validarSubcategoria, subCategoriaController.atualizar)
router.delete('/subcategorias/:id', validarId, subCategoriaController.excluir)

// ROTAS DE FORMA DE PAGAMENTO
router.post('/formapagamentos', validarFormaPagamento, formaPagamentoController.criar)
router.get('/formapagamentos', formaPagamentoController.buscarTodos)
router.get('/formapagamentos/:id', validarId, validarFormaPagamento, formaPagamentoController.buscarPorId)
router.put('/formapagamentos/:id', validarId, validarFormaPagamento, formaPagamentoController.atualizar)
router.delete('/formapagamentos/:id', validarId, formaPagamentoController.excluir)

// ROTAS DE PRODUTOS
router.post('/produtos', validarProduto, produtoController.criar)
router.get('/produtos', produtoController.buscarTodos)
router.get('/produtos/:id', validarId, produtoController.buscarPorId)
router.put('/produtos/:id', validarProduto, validarId, produtoController.atualizar)
router.delete('/produtos/:id', validarId, produtoController.excluir)

// ROTAS DE PEDIDO
router.post('/pedidos', validarPedido, pedidoController.criar)
router.get('/pedidos', pedidoController.buscarTodos)
router.get('/pedidos/:id', validarId, pedidoController.buscarPorId)
router.put('/pedidos/:id', validarId, validarPedido, pedidoController.atualizar)
router.delete('/pedidos/:id', validarId, pedidoController.excluir)

// EXPORTANDO MÓDULO
module.exports = router
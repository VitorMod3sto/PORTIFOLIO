// IMPORTANDO BIBLIOTECAS E SHEMAS
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Cliente = require('../models/cliente');
const Produto = require('../models/produto');
const Pagamento = require('../models/FormaPagamento');
const Pedido = require('../models/pedido');
const { enviarMensagemBoasVindas } = require('../mails'); // Importe a função de envio de email

// FUNÇÃO PARA REGISTRAR UM PEDIDO
async function criar(req, res) {
    // recebendo dados do pedido
    const { cliente, produto, quantidade, dataPedido, pagamento } = req.body;

    // validação dos IDs
    if (!mongoose.Types.ObjectId.isValid(cliente)) {
        return res.status(400).json({ mensagem: 'Cliente inválido' });
    }
    const clienteId = cliente;

    if (!mongoose.Types.ObjectId.isValid(produto)) {
        return res.status(400).json({ mensagem: 'Produto inválido' });
    }
    const produtoId = produto;

    if (!mongoose.Types.ObjectId.isValid(pagamento)) {
        return res.status(400).json({ mensagem: 'Forma de pagamento inválido' });
    }
    const formaPagamentoId = pagamento;

    // buscar informações do produto
    const produtoInfo = await Produto.findById(produtoId);

    if (!produtoInfo) {
        return res.status(400).json({ mensagem: 'Produto não encontrado' });
    }

    // calcular o valor total do pedido
    const valorTotal = produtoInfo.preco * quantidade;

    // criando novo pedido
    const novoPedido = new Pedido({
        cliente: clienteId,
        produto: produtoId,
        quantidade,
        pagamento: formaPagamentoId,
        valorTotal
    });

    await novoPedido.save();

    // buscar informações do cliente
    const clienteInfo = await Cliente.findById(clienteId);
    if (!clienteInfo) {
        return res.status(400).json({ mensagem: 'Cliente não encontrado' });
    }

    // enviando mensagem de boas-vindas
    const { nome, email } = clienteInfo; // Buscar nome e email do cliente
    await enviarMensagemBoasVindas(nome, email); // Enviar email

    res.status(201).json({ mensagem: 'Pedido cadastrado com sucesso!', novoPedido });
}


//  FUNÇÃO PARA BUSCAR TODOS OS PEDIDOS
async function buscarTodos(req, res) {
    res.json(await Pedido.find().populate(['cliente', 'pagamento', 'produto']))
}

// FUNÇÃO PARA BUSCAR UM PEDIDO POR ID
async function buscarPorId(req, res) {
    const pedido = await Pedido.findById(req.params.id).populate(['cliente', 'pagamento', 'produto'])
    if (pedido) {
        res.json({ mensagem: "Dados do pedido:", pedido })
    } else {
        res.status(404).json({ mensagem: "Pedido não encontrada" })
    }
}

// FUNÇÃO PARA ATUALIZAR UM PEDIDO
async function atualizar(req, res) {
    // importação dos Models
    const Cliente = require('../models/cliente');
    const Produto = require('../models/produto');
    const Pagamento = require('../models/FormaPagamento');
    const Pedido = require('../models/pedido'); // Importe o modelo do Pedido

    // obtendo ID do pedido
    const idPedido = req.params.id;

    // obtendo o pedido atual
    const pedidoAtual = await Pedido.findById(idPedido);

    // verificando se o pedido foi encontrado
    if (!pedidoAtual) {
        return res.status(404).json({ mensagem: 'Pedido não encontrado' });
    }

    // extraindo as novas informações do pedido
    const novoCliente = req.body.cliente;
    const novoProduto = req.body.produto;
    const novaQuantidade = req.body.quantidade;
    const novaDataPedido = req.body.dataPedido;
    const novoPagamento = req.body.pagamento;

    // validando os IDs
    const clienteId = req.body.cliente;
    const produtoId = req.body.produto;
    const pagamentoId = req.body.pagamento;

    if (!mongoose.Types.ObjectId.isValid(clienteId)) {
        return res.status(400).json({ mensagem: "Cliente inválido" });
    }

    if (!mongoose.Types.ObjectId.isValid(produtoId)) {
        return res.status(400).json({ mensagem: "Produto inválido" });
    }

    if (!mongoose.Types.ObjectId.isValid(pagamentoId)) {
        return res.status(400).json({ mensagem: "Forma de Pagamento inválida" });
    }

    // buscando informações do produto para calcular o novo valor total
    const produtoInfo = await Produto.findById(produtoId);

    if (!produtoInfo) {
        return res.status(400).json({ mensagem: "Produto não encontrado" });
    }

    // calculando o novo valor total
    const novoValorTotal = produtoInfo.preco * novaQuantidade;

    // atualizando o pedido
    const pedidoAtualizado = await Pedido.findByIdAndUpdate(idPedido, {
        cliente: clienteId,
        produto: produtoId,
        quantidade: novaQuantidade,
        dataPedido: novaDataPedido,
        pagamento: pagamentoId,
        // Atualizando o valor total
        valorTotal: novoValorTotal 
    }, { new: true });

    // verificando se a atualização foi bem-sucedida
    if (!pedidoAtualizado) {
        return res.status(500).json({ mensagem: 'Erro ao atualizar pedido' });
    }

    // retornando o pedido atualizado
    res.json({ mensagem: 'Pedido atualizado com sucesso!', pedidoAtualizado });
}

// FUNÇÃO PARA EXCLUIR UM PEDIDO
async function excluir(req, res) {
    const pedidoExcluido = await Pedido.findByIdAndDelete(req.params.id)
    if (pedidoExcluido) {
        res.json(
            {
                mensagem: "Pedido excluida com sucesso!",
                pedidoExcluido
            }
        )
    } else {
        res.status(404).json({ mensagem: "Pedido não encontrada!" })
    }
}

//  EXPORTANDO FUNÇÕES
module.exports = {
    criar,
    buscarTodos,
    buscarPorId,
    atualizar,
    excluir
}
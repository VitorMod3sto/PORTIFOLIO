// IMPORTANDO SHEMA DE FORMA DE PAGAMENTO
const FormaPagamento = require('../models/FormaPagamento');

// FUNÇÃO PARA CRIAR FORMA DE PAGAEMENTO
async function criar(req, res) {
    // recebendo dados 
    const { nome, descricao } = req.body;
    // verificando se o nome  já está cadastrado
    const formapagamentoNome = await FormaPagamento.findOne({ nome });
    if (formapagamentoNome) {
        return res.status(400).json({ mensagem: "Essa Forma de pagamento já existe" });
    }
    // criando nova forma de pagamento
    const novaFormapagamento = new FormaPagamento({
        nome,
        descricao
    });

    await novaFormapagamento.save();

    res.status(201).json({ mensagem: "Categoria cadastrado com sucesso!", novaFormapagamento });
}

//  FUNÇÃO PARA BUSCAR TODAS AS FORMAS DE PAGAMENTO
async function buscarTodos(req, res) {
    res.json(await FormaPagamento.find())
}

// FUNÇÃO PARA BUSCAR UMA FORMA DE PAGAMENTO POR ID
async function buscarPorId(req, res) {
    const formapagamento = await FormaPagamento.findById(req.params.id)
    if (formapagamento) {
        res.json(formapagamento)
    } else {
        res.status(404).json({ mensagem: "Forma de pagamento não encontrada" })
    }
}

// FUNÇÃO PARA ATUALIZAR INFORMAÇÕES DE UMA FORMA DE PAGAMENTO
async function atualizar(req, res) {
    // obtendo ID da forma de pagamento
    const idFormaPagamento = req.params.id;
  
    // obtendo a forma de pagamento atual
    const formaPagamentoAtual = await FormaPagamento.findById(idFormaPagamento);
  
    // verificando se o ID foi encontrado
    if (!formaPagamentoAtual) {
      return res.status(404).json({ mensagem: 'Forma de pagamento não encontrada' });
    }
  
    // extraindo as novas informações da forma de pagamento
    const novoNome = req.body.nome;
    const novaDescricao = req.body.descricao;
  
    // atualizando a forma de pagamento
    const formaPagamentoAtualizada = await FormaPagamento.findByIdAndUpdate(idFormaPagamento, {
      nome: novoNome,
      descricao: novaDescricao
    }, { new: true });
  
    // verificando se a atualização deu certo
    if (!formaPagamentoAtualizada) {
      return res.status(500).json({ mensagem: 'Erro ao atualizar forma de pagamento' });
    }
  
    // retornando a forma de pagamento atualizada
    res.json({ mensagem: 'Forma de pagamento atualizada com sucesso!', formaPagamentoAtualizada });
  }

// FUNÇÃO PARA EXCLUIR UMA FORMA DE PAGAMENTO
async function excluir(req, res) {
    const formapagamentoExcluida = await FormaPagamento.findByIdAndDelete(req.params.id)
    if (formapagamentoExcluida) {
        res.json(
            {
                mensagem: "Forma de pagamento excluida com sucesso!",
                formapagamentoExcluida
            }
        )
    } else {
        res.status(404).json({ mensagem: "Forma de pagamento não encontrada!" })
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
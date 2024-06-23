// IMPORTANDO BIBLIOTECA
const mongoose = require('mongoose')

// IMPORTANDO SHEMA DE PRODUTO
const Produto = require('../models/produto')

// FUNÇÃO PARA CRIAR UM PRODUTO
async function criar(req, res) {
    // recebendo dados da produto
    const { nome, descricao, marca, categoria, tamanho, preco } = req.body;

    // importação do Model do produto
    const Categoria = require('../models/categoria'); // ou o caminho para o seu model

    // verificando se o nome já está cadastrado
    const produtoNome = await Produto.findOne({ nome });
    if (produtoNome) {
        return res.status(400).json({ mensagem: "Esse produto já existe" });
    }
    // validação do ID da categoria
    if (!mongoose.Types.ObjectId.isValid(categoria)) {
        return res.status(400).json({ mensagem: "Categoria inválida" });
    }
    const categoriaId = categoria;

    // criando novo produto
    const novoProduto = new Produto({
        nome, descricao, marca, categoria, tamanho, preco
    });

    await novoProduto.save();
    res.status(201).json({ mensagem: "Produto cadastrada com sucesso!", novoProduto });
}

//  FUNÇÃO PARA BUSCAR TODAS OS PRODUTOS
async function buscarTodos(req, res) {
    res.json(await Produto.find().populate(['categoria']))
}

// FUNÇÃO PARA BUSCAR PRODUTO POR ID
async function buscarPorId(req, res) {
    const produto = await Produto.findById(req.params.id).populate(['categoria'])
    if (produto) {
        res.json(produto)
    } else {
        res.status(404).json({ mensagem: "Produto não encontrada" })
    }
}

// FUNÇÃO PARA ATUALIZAR INFORMAÇÕES DE UM PRODUTO
async function atualizar(req, res) {
    // obtendo ID do produto
    const idProduto = req.params.id;
  
    // obtendo o produto atual
    const produtoAtual = await Produto.findById(idProduto);
  
    // verificando se o id foi encontrado
    if (!produtoAtual) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
  
    // extraindo as novas informações do produto
    const novoNome = req.body.nome;
    const novaDescricao = req.body.descricao;
    const novaMarca = req.body.marca;
    const novaCategoria = req.body.categoria;
    const novoTamanho = req.body.tamanho;
    const novoPreco = req.body.preco;
  
    // definindo a variável categoriaId antes da validação
    const categoriaId = req.body.categoria;
  
    // validando o ID da categoria
    if (!mongoose.Types.ObjectId.isValid(categoriaId)) {
      return res.status(400).json({ mensagem: "Categoria inválida" });
    }
  
    // atualizando o produto
    const produtoAtualizado = await Produto.findByIdAndUpdate(idProduto, {
      nome: novoNome,
      descricao: novaDescricao,
      marca: novaMarca,
      categoria: categoriaId,
      tamanho: novoTamanho,
      preco: novoPreco
    }, { new: true });
  
    // verificando se a atualização deu certo
    if (!produtoAtualizado) {
      return res.status(500).json({ mensagem: 'Erro ao atualizar produto' });
    }
  
    // retornando o produto atualizado
    res.json({ mensagem: 'Produto atualizado com sucesso!', produtoAtualizado });
  }

// FUNÇÃO PARA EXCLUIR UM PRODUTO
async function excluir(req, res) {
    const produtoExcluido = await Produto.findByIdAndDelete(req.params.id)
    if (produtoExcluido) {
        res.json(
            {
                mensagem: "Produto excluida com sucesso!",
                produtoExcluido
            }
        )
    } else {
        res.status(404).json({ mensagem: "Produto não encontrada!" })
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


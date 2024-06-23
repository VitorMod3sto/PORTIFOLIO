// IMPORTANDO SHEMA DE CATEGORIAS
const Categoria = require('../models/categoria')

// FUNÇÃO PARA CRIAR UMA CATEGORIA
async function criar(req, res) {
    // recebendo dados da categoria
    const { nome, descricao } = req.body;
    // verificando se o nome da categoria já está cadastrado
    const categoriaNome = await Categoria.findOne({ nome });
    if (categoriaNome) {
        return res.status(400).json({ mensagem: "Essa categoria já existe" });
    }
    // criando nova categoria
    const novaCategoria = new Categoria({
        nome,
        descricao
    });

    await novaCategoria.save();

    res.status(201).json({ mensagem: "Categoria cadastrado com sucesso!", novaCategoria });
}

//  FUÇÃO DE BUSCA DE TODAS AS CATEGORIAS
async function buscarTodos(req, res) {
    res.json(await Categoria.find())
}

// FUNÇÃO DE BUSCA DE UMA CATEGORIA POR ID
async function buscarPorId(req, res) {
    const categoria = await Categoria.findById(req.params.id)
    if (categoria) {
        res.json(categoria)
    } else {
        res.status(404).json({ mensagem: "Categoria não encontrado" })
    }
}

// FUNÇÃO DE ATUALIZAR INFORMAÇÕES DE UMA CATEGORIA
async function atualizar(req, res) {
    // obtendo ID da categoria
    const idCategoria = req.params.id;
  
    // obtendo a categoria atual
    const categoriaAtual = await Categoria.findById(idCategoria);
  
    // verificando se a categoria foi encontrada
    if (!categoriaAtual) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada' });
    }
  
    // extraindo as novas informações da categoria
    const novoNome = req.body.nome;
    const novaDescricao = req.body.descricao;
  
    // atualizando a categoria
    const categoriaAtualizada = await Categoria.findByIdAndUpdate(idCategoria, {
      nome: novoNome,
      descricao: novaDescricao
    }, { new: true });
  
    // verificando se a atualização deu certo
    if (!categoriaAtualizada) {
      return res.status(500).json({ mensagem: 'Erro ao atualizar categoria' });
    }
  
    // retornando a categoria atualizada
    res.json({ mensagem: 'Categoria atualizada com sucesso!', categoriaAtualizada });
  }

// FUNÇÃO PARA EXCLUIR UMA CATEGORIA
async function excluir(req, res) {
    const categoriaExcluida = await Categoria.findByIdAndDelete(req.params.id)
    if (categoriaExcluida) {
        res.json(
            {
                mensagem: "Categoria excluida com sucesso!",
                categoriaExcluida
            }
        )
    } else {
        res.status(404).json({ mensagem: "Categoria não encontrado!" })
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
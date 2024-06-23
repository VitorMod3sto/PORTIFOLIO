// IMPORTANDO O SHEMA DE CLIENTES
// IMPORTANDO BIBLIOETCA BCRYPT
const Cliente = require('../models/cliente')
const bcrypt = require('bcrypt')

// FUNÇÃO PARA REGISTRAR UM CLIENTE
async function registrar(req, res) {
    // recebendo dados do cliente
    const { nome, email, telefone, senha, endereco, dataNascimento } = req.body;
    // verificando se o email já está cadastrado
    const clienteComEmail = await Cliente.findOne({ email });
    if (clienteComEmail) {
      return res.status(400).json({ mensagem: "O email já está cadastrado" });
    }
    // verificando se o telefone já está cadastrado
    const clienteComTelefone = await Cliente.findOne({ telefone });
    if (clienteComTelefone) {
      return res.status(400).json({ mensagem: "O telefone já está cadastrado" });
    }

    // criptografando a senha com a função hash (biblioteca bcrypt)
    const hash = await bcrypt.hash(senha, 10);

    // criando novo cliente
    const novoCliente = new Cliente({
      nome,
      email,
      telefone,
      senha: hash,
      endereco,
      dataNascimento
    });
  
    await novoCliente.save();
  
    res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!", novoCliente });
  }

// FUNÇÃO DE LOGIN DO CLIENTE
async function login(req, res) {
    const { email, senha } = req.body
    // verificando se o email está correto
    const cliente = await Cliente.findOne({ email })
    if (!cliente) {
        return res.status(401).json({ mensagem: "Cliente não encontrado" })
    }
    // verificando se a senha está correta
    const senhaValida = await bcrypt.compare(senha, cliente.senha)
    if (!senhaValida) {
        return res.status(401).json({ mensagem: "Senha incorreta" })
    }
    // devolve a mensagem de bem vindo + nome do cliente correspondente aos dados
    res.json({ mensagem: `Seja bem vindo ${cliente.nome}` })
}

//  FUNÇÃO PARA BUSCAR TODOS OS CLIENTES
async function buscarTodos(req, res) {
    res.json(await Cliente.find())
}

// FUNÇÃO PARA BUSCAR UM CLIENTE POR ID
async function buscarPorId(req, res) {
    const cliente = await Cliente.findById(req.params.id)
    if (cliente) {
        res.json(cliente)
    } else {
        res.status(404).json({ mensagem: "Cliente não encontrado" })
    }
}

// FUNÇÃO PARA ATUALIZAR DADOS DE UM CLIENTE
async function atualizar(req, res) {
    // obter ID do cliente
    const idCliente = req.params.id;
    // obter cliente atual
    const clienteAtual = await Cliente.findById(idCliente);
    // se cliente não encontrado, retornar erro
    if (!clienteAtual) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }
    // extrair senha e email atuais
    const senhaAtual = clienteAtual.senha;
    const emailAtual = clienteAtual.email;
    // obter novas informações do cliente
    const novoNome = req.body.nome || clienteAtual.nome;
    const novoTelefone = req.body.telefone || clienteAtual.telefone;
    const novoEmail = req.body.email || clienteAtual.email;
    const novaSenha = req.body.senha;
    const novoendereco = req.body.endereco || clienteAtual.endereco;
    const novaDataN = req.body.dataNascimento || clienteAtual.dataNascimento;
    // verificar se senha é igual à atual
    if (novaSenha && bcrypt.compareSync(novaSenha, senhaAtual)) {
        return res.status(400).json({ mensagem: 'A senha não pode ser igual à atual' });
    }
    // verificar se email é igual ao atual
    if (novoEmail === emailAtual) {
        return res.status(400).json({ mensagem: 'O email não pode ser igual ao atual' });
    }
    // criptografar nova senha 
    const senhaCript = novaSenha ? await bcrypt.hash(novaSenha, 10) : senhaAtual;
    // atualizar cliente
    const clienteAtualizado = await Cliente.findByIdAndUpdate(idCliente, {
        nome: novoNome,
        email: novoEmail,
        telefone: novoTelefone,
        senha: senhaCript,
        endereco: novoendereco,
        dataNascimento: novaDataN
    }, { new: true });

    if (!clienteAtualizado) {
        return res.status(500).json({ mensagem: 'Erro ao atualizar cliente' });
    }

    res.json({ mensagem: 'Cliente atualizado com sucesso!', clienteAtualizado });
}

// FUNÇÃO PARA EXCLUIR UM CLIENTE
async function excluir(req, res) {
    const clienteExcluido = await Cliente.findByIdAndDelete(req.params.id)
    if (clienteExcluido) {
        res.json(
            {
                mensagem: "Cliente excluido com sucesso!",
                clienteExcluido
            }
        )
    } else {
        res.status(404).json({ mensagem: "Cliente não encontrado!" })
    }
}

//  EXPORTANDO FUNÇÕES
module.exports = {
    registrar,
    buscarTodos,
    login,
    buscarPorId,
    atualizar,
    excluir
}


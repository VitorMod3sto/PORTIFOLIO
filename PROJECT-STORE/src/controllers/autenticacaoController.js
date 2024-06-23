// IMPORTANDO O SHEMA DE USUARIO
// IMPORTANDO BIBLIOTECAS E VARIÁVEIS DE AMBIENTE
const Usuario = require('../models/usuario')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// FUNÇÃO PARA CRIAR UM USUÁRIO
async function registrar(req, res) {
    const { nome, email, senha } = req.body
    // validando se o email já está cadastrado
    // usando o findOne pra buscar somente o primeiro a ser encontrado
    const usuario = await Usuario.findOne({ email })
    if (usuario) {
        return res.status(400).json({ mensagem: "O email já está cadastrado" })
    }
    // usando a função HASH para salvar no banco de dados a senha em criptografia alfabética
    // usando método salt (senha, salt(quantos caracteres serão gerados) para gerar a senha + caracteres)
    // para aumentar a segurança (ficará a senha + letras aleatórias)
    const hash = await bcrypt.hash(senha, 10)
    const novoUsuario = new Usuario({
        nome,
        email,
        senha: hash
    })
    await novoUsuario.save()
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" })
}

// FUNÇÃO DE LOGIN DO USUÁRIO
async function login(req, res) {
    const { email, senha } = req.body
    // recebendo email do usuário e verificando se está cadastrado
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        return res.status(401).json({ mensagem: "Usuário não encontrado" })
    }
    // recebendo a senha e verificando se está correta
    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    if (!senhaValida) {
        return res.status(401).json({ mensagem: "Senha incorreta" })
    }
    // usando a biblioteca jwt para gerar um token de acesso a aplicação.
    // validando o token gerado
    const token = jwt.sign({
        nome: usuario.nome,
        email: usuario.email
    }, JWT_SECRET, {
        expiresIn: '120m'
    })
    res.json({mensagem: "Usuário logado com sucesso", token})

}

// EXPORTANDO FUNÇÕES
module.exports = {
    registrar,
    login

}
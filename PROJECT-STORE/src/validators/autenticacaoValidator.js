// IMPORTANDO BIBLIOTECAS
const yup = require('yup')
const Usuario = require('../models/usuario')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')


// CRIANDO UM ESQUEMA DE VALIDAÇÃO
// DENTRO DE SHAPE, FICA O CORPO/ESTRUTURA DO OBJETO
// VERIRIFICANDO SE TEM TODOS OS DADOS
// SCHEMA DE USUÁRIO
const schema = yup.object().shape({
    nome: yup
        .string("Campo precisa ser uma String")
        .required("Campo obrigatório"),

    email: yup
        .string("Campo precisa ser uma String")
        .email("Email inválido")
        .required("Campo obrigatório"),

    senha: yup
        .string("Campo precisa ser uma String")
        .required("Campo obrigatório")
})

// CRIANDO O VALIDADOR DE USUÁRIO
function validarUsuario(req, res, next) {
    schema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => {
            const erros = err.inner.map(e => {
                const erro = {
                    campo: e.path,
                    erros: e.errors
                }
                return erro
            })
            res.status(400).json({
                mensagem: "Falha na valdiação dos campos",
                erros
            })
        })
}

// CRIANDO FUNÇÃO PARA VALIDAR OS DADOS AO REGISTRAR
const loginSchema = yup.object().shape({
    email: yup
        .string("Campo precisa ser uma String")
        .email("Email inválido")
        .required("Campo obrigatório"),

    senha: yup
        .string("Campo precisa ser uma String")
        .required("Campo obrigatório")
})

// VALIDAR O LOGIN/REGISTRO
function validarLogin(req, res, next) {
    loginSchema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => {
            const erros = err.inner.map(e => {
                const erro = {
                    campo: e.path,
                    erros: e.errors
                }
                return erro
            })
            res.status(400).json({
                mensagem: "Falha na valdiação dos campos",
                erros
            })
        })
}

// VALIDAR TOKEN
async function checkToken(req, res, next) {
    try {
        const header = req.get('Authorization').split(' ')
        const token = header[1]
        jwt.verify(token, JWT_SECRET)
        next()
    } catch (err) {
        return res.status(401).json({ mensagem: "Token invalido" })
    }
}

module.exports = {
    validarUsuario,
    validarLogin,
    checkToken
}
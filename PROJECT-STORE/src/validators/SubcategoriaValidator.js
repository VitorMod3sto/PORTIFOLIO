// IMPORTANDO BIBLIOTECA YUP
const yup = require('yup')

// CRIANDO UM ESQUEMA DE VALIDAÇÃO
// DENTRO DE SHAPE, FICA O CORPO/ESTRUTURA DO OBJETO
// VERIRIFICANDO SE TEM TODOS OS DADOS
const schema = yup.object().shape({
    nome: yup
        .string("Campo precisa ser uma String")
        .required("Campo obrigatório"),

    descricao: yup
        .string("Campo precisa ser uma String")
        .required("Campo obrigatório"),

    categoria: yup
        .string("Campo precisa ser uma String")
        .required("Campo obrigatório")
})

// CRIANDO FUNÇÃO DE VALIDAR SUBCATEGORIA
function validarSubcategoria(req, res, next) {
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

module.exports = {
    validarSubcategoria
}
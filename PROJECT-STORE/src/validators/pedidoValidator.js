// IMPORTANDO BIBLIOTECA YUP
const yup = require('yup')

const schema = yup.object().shape({
    cliente: yup
        .string("Campo precisa ser uma String")
        .required("Campo obrigatório"),

        produto: yup
        .string("Campo precisa ser uma String")
        .required("Campo obrigatório"),

        quantidade: yup
        .number() // Garante que seja um número
        .required("Campo obrigatório")
        .integer("A quantidade precisa ser um número inteiro")
        .positive("A quantidade precisa ser um número positivo")
        .typeError("Precisa ser um número"), // Adiciona uma mensagem de erro caso não seja um número válido


        dataPedido: yup
        .date("Data inválida")
        .required("Campo obrigatório"),

        pagamento: yup
        .string("Campo precisa ser uma String")
        .required("Campo obrigatório"),

        valorTotal: yup
        .number() // Garante que seja um número
        .required("Campo obrigatório")
        .positive("O valor total precisa ser um número positivo")
        .typeError("Precisa ser um número") // Adiciona uma mensagem de erro caso não seja um número válido
})

// CRIANDO VALIDAÇÃO DO PEDIDO
function validarPedido(req, res, next) {
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
    validarPedido
}
// VALIDANDO ID (intermediário)
const mongoose = require('mongoose')

// CRIANDO FUNÇÃO DE VALIDAR ID
function validarId(req, res, next){
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id)
   if(isValid){
    next()
   } else{
    return res.status(400).json({mensagem: "ID inválido"})
   }
}

//  EXPORTANDO FUNÇÃO "CRIAR"
module.exports = {
    validarId
}

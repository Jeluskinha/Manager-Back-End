const validateKeys = ([... arr], quimico: object) => { // (...arrr: chaves esperadas(corretas), quimico: objeto recebido do front-end)
    if(arr.every(chave => chave in quimico)){// verificando se todas as chaves recebidas estão corretas
        return true 
        // retornando true apenas para continuar função CONTROLLER
    } else {
        throw new Error 
        // lançando Error "normal" para que entre no catch do CONTROLLER, porém NÃO entrará na verificação de istance of AppError -> entrará no ELSE retornando o erro personalizado
    }
}

export {validateKeys}
import { Quimico } from "../../../entities/main_database/quimicos/quimico.entity";
import { IQuimico, IQuimicoCreate } from "../../../interfaces/main_database/quimicos";
import { VancourosDataSource } from "../../../database/data-source-main";
import { AppError } from "../../../errors/appError";
import estoqueCreateService from "../estoque/estoqueCreate.service";


const AdminQuimicoCreateAllService = async (lista : IQuimico[]) => { // cadastra todos os quimicos e cria o estoque ao mesmo tempo
  const quimicoRepository = VancourosDataSource.getRepository(Quimico)
  const quimicos = await quimicoRepository.find()

  const quimicosJaCadastrados:IQuimico[] = []
  const quimicosNovos:IQuimico[] = []

  lista.forEach(async (item) =>{
    const quimicoAlreadyExists = quimicos.find(quimicos => quimicos.codigo === item.codigo)
    if (quimicoAlreadyExists) {  
      quimicosJaCadastrados.push(quimicoAlreadyExists)
    } else {
      quimicosNovos.push(item)
    }
  })

  if(quimicosJaCadastrados.length === lista.length) { // caso todos sejam repetidos
    throw new AppError("a lista de químicos já foi cadastrada", 409) // 409 -> conflict
  }

  else if(quimicosNovos.length === lista.length){// caso todos sejam novos cadastros
    lista.forEach(async (item) => {
      
      // 1. Primeiro criar o quimico
      const quimico:IQuimicoCreate = new Quimico()
        quimico.produto = item.produto
        quimico.codigo = item.codigo
        quimico.criado_em = new Date
        quimico.atualizado_em = new Date
        quimico.versao = "120-7201-VS001"

      quimicoRepository.create(quimico)
      const quimicoCadastrado = await quimicoRepository.save(quimico) // Agora salva com o estoque
      
      if(quimicoCadastrado) { // se quimico for cadastrado então cadastra o Estoque
        // 2. Criar o estoque JÁ com o quimico vinculado
         await estoqueCreateService({ produto: item.produto, codigo: item.codigo}, quimicoCadastrado)
       } else {
        throw new AppError(`chave 'quimico' não foi encontrada -> cadastrar Estoque falhou`, 409);
      }
    });
      return `Lista de químicos cadastrados com sucesso ${quimicos} itens adicionado`
  }  
  else if(quimicosNovos.length !== lista.length){ // caso haja itens cadastrados e novos misturados na request
    quimicosNovos.forEach(async (item) => {

      // 1. Primeiro criar o quimico
      const quimico:IQuimicoCreate = new Quimico()
        quimico.produto = item.produto
        quimico.codigo = item.codigo
        quimico.criado_em = new Date
        quimico.atualizado_em = new Date
        quimico.atualizado_por = "Admin"
        quimico.versao = "120-7201-VS001"

      quimicoRepository.create(quimico)
      const quimicoCadastrado = await quimicoRepository.save(quimico) // Agora salva com o estoque
      
      if(quimicoCadastrado) { // se quimico for cadastrado então cadastra o Estoque
        // 2. Criar o estoque JÁ com o quimico vinculado
         await estoqueCreateService({ produto: item.produto, codigo: item.codigo}, quimicoCadastrado)
       } else {
        throw new AppError(`chave 'quimico' não foi encontrada -> cadastrar Estoque falhou`, 409);
      }
    });
    return `${quimicos.length} já estavam cadastrados ${quimicosNovos.length} novos foram adicionados`
  } else {  // caso não entre em alguma tratativa retorna essa mensagem para eu saber que preciso tratar
    return 'verificar tratativa do serviçe'
  }
}
export default AdminQuimicoCreateAllService






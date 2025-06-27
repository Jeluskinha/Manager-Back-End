import { Quimicos } from "../../entities/quimicos/quimico.entity";
import { IQuimico, IQuimicoCreate } from "../../interfaces/quimicos";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";


const quimicoCreateMuitosService = async (lista : IQuimico[]) => {
  const quimicoRepository = AppDataSource.getRepository(Quimicos)
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

  if(quimicosJaCadastrados.length === lista.length) {
    throw new AppError("a lista de químicos já foi cadastrada", 409) // 409 -> conflict
  }

  if(quimicosNovos.length === lista.length){
    lista.forEach(async (item) => {
      const quimico:IQuimicoCreate = new Quimicos()
        quimico.nome = item.nome
        quimico.codigo = item.codigo
        quimico.createdAt = new Date
        quimico.updatedAt = new Date
        quimico.version = "120-7201-VS001"
      
        quimicoRepository.create(quimico)
        await quimicoRepository.save(quimico) 
    });
      return `Lista de químicos cadastrados com sucesso ${quimicos} itens adicionado`
  } 
  quimicosNovos.forEach(async (item) => {
    const quimico:IQuimicoCreate = new Quimicos()
      quimico.nome = item.nome
      quimico.codigo = item.codigo
      quimico.createdAt = new Date
      quimico.updatedAt = new Date
      quimico.version = "120-7201-VS001"
    
      quimicoRepository.create(quimico)
      await quimicoRepository.save(quimico) 
  });
  return `${quimicos.length} já estavam cadastrados ${quimicosNovos.length} novos foram adicionados`
}

export default quimicoCreateMuitosService
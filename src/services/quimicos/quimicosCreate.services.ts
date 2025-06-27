import { Quimicos } from "../../entities/quimicos/quimico.entity";
import { IQuimico, IQuimicoCreate } from "../../interfaces/quimicos";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";



 
const quimicoCreateService = async ({nome, codigo} : IQuimico) => {
  const quimicoRepository = AppDataSource.getRepository(Quimicos)
  const quimicos = await quimicoRepository.find()

  const quimicoAlreadyExists = quimicos.find (quimicos => quimicos.codigo === codigo)

  if (quimicoAlreadyExists) {
    throw new AppError(`${nome} já foi cadastrado`, 403)
  }

  console.log(nome, codigo)
  const quimico:IQuimicoCreate = new Quimicos()
  quimico.nome = nome
  quimico.codigo = codigo
  quimico.createdAt = new Date
  quimico.updatedAt = new Date
  quimico.version = "120-7201-VS001"

  quimicoRepository.create(quimico)
  await quimicoRepository.save(quimico) 

  return quimico
}

export default quimicoCreateService
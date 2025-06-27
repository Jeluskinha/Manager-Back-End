import { IQuimicoUpdateRequest } from "../../interfaces/quimicos/index";
import { Quimicos } from "../../entities/quimicos/quimico.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const quimicosDeleteByCodeService = async (id: string) => {
  const quimicoRepository = AppDataSource.getRepository(Quimicos)
  
  const quimico = await quimicoRepository.findOneBy({
      id
  })
  if(!quimico){
      throw new Error("Quimico não encontrado")
  }

  // if(quimico.isActive === false){
  //     throw new Error("User is not found")
  // } aqui eu faço a verificação da chave isActive 

  await quimicoRepository.delete(quimico.id) // precisa definir o .id para deletar
  // await quimicoRepository.update(
  //     id,
  //     {
  //         isActive: false
  //     }
  // )// aqui estou fazendo o Soft delete, alterando o isActive para false
  return 'Produto excluido'
};

export default quimicosDeleteByCodeService;

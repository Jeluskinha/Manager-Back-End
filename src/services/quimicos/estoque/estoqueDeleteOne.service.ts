
import { Estoque } from "../../../entities/main_database/quimicos/estoque.entity";
import { VancourosDataSource } from "../../../database/data-source-main";

const estoqueDeleteByIdService = async (id: string) => {
  const estoqueRepository = VancourosDataSource.getRepository(Estoque)

  const estoque = await estoqueRepository.findOneBy({
      id
  })
  if(!estoque){
      throw new Error("Químico em estoque não encontrado")
  }
 

  // if(estoque.isActive === false){
  //     throw new Error("User is not found")
  // } aqui eu faço a verificação da chave isActive 

  await estoqueRepository.delete(estoque.id) // precisa definir o .id para deletar
  // await estoqueRepository.update(
  //     id,
  //     {
  //         isActive: false
  //     }
  // )// aqui estou fazendo o Soft delete, alterando o isActive para false
  return 'Químico em estoque excluido'
};

export default estoqueDeleteByIdService;

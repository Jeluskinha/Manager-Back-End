import { Estoque } from "../../../entities/main_database/quimicos/estoque.entity";
import { IEstoque, IEstoqueCreate } from "../../../interfaces/main_database/quimicos/estoque";
import { VancourosDataSource } from "../../../database/data-source-main";
import { AppError } from "../../../errors/appError";
import { Quimico } from "../../../entities/main_database/quimicos/quimico.entity";

 
const estoqueCreateService = async ({produto, codigo} : IEstoque, quimico: Quimico) => {
  const estoqueRepository = VancourosDataSource.getRepository(Estoque)

  const listadeEstoque = await estoqueRepository.find()

  const estoqueAlreadyExists = listadeEstoque.find (estoque => estoque.codigo === codigo)
  
  if (estoqueAlreadyExists) {
    throw new AppError(`${produto} já foi cadastrado`, 403)
  }

  const estoque:IEstoqueCreate = new Estoque()
  estoque.produto = produto
  estoque.codigo = codigo
  estoque.atualizado_em = new Date
  estoque.atualizado_por = 'AdminUser'
  estoque.quimico = quimico

  estoqueRepository.create(estoque)
  await estoqueRepository.save(estoque) 
  
  return estoque
}

export default estoqueCreateService
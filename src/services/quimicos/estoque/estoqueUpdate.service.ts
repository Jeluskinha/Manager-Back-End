import { IEstoqueUpdate } from "../../../interfaces/main_database/quimicos/estoque";

import { Estoque } from "../../../entities/main_database/quimicos/estoque.entity";

import { VancourosDataSource } from "../../../database/data-source-main";
import { AppError } from "../../../errors/appError";


const estoqueUpdateService = async (id: string) => {
  const estoqueRepository = VancourosDataSource.getRepository(Estoque);

  const estocado = await estoqueRepository.findOneBy({
    id,
  });
 
  if (!estocado) {
    throw new AppError("Produto em estoque não encontrado", 404);
  }

  await estoqueRepository.update(id, { 
    atualizado_em: new Date,
    atualizado_por: 'Admin'
  });

  const estocadoAtualizado = await estoqueRepository.findOneBy({
    id,
  });

  return estocadoAtualizado
};

export default estoqueUpdateService;


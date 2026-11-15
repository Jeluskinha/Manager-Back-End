import { Quimico } from "../../../entities/main_database/quimicos/quimico.entity";
import { VancourosDataSource } from "../../../database/data-source-main";
import { AppError } from "../../../errors/appError";
import estoqueDeleteByIdService from "../estoque/estoqueDeleteOne.service";

const quimicosDeleteByCodeService = async (id: string) => {
  const quimicoRepository = VancourosDataSource.getRepository(Quimico)

  const quimico = await quimicoRepository.findOne({
      where: { 
        id,
        status: true // ← verificação direto no find
      }
    });

  if(!quimico){
      throw new AppError("Químico não encontrado")
  }

  // Soft delete
  await quimicoRepository.update(id, {
    status: false,
    atualizado_em: new Date()
  });
  
  return 'Químico excluido'
};

export default quimicosDeleteByCodeService;

import { Quimico } from "../../../entities/main_database/quimicos/quimico.entity";
import { VancourosDataSource } from "../../../database/data-source-main";
import { AppError } from "../../../errors/appError";

const quimicosListByIdService = async (id: string) => {
  const quimicoRepository = VancourosDataSource.getRepository(Quimico);

  const quimico = await quimicoRepository.findOneBy({
    id,
  });

  if (!quimico) {
    throw new AppError("Produto Quimico não encontrado", 404);
  }
  
  return quimico;
};

export default quimicosListByIdService;

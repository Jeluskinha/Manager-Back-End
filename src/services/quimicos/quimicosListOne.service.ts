import { IQuimicoUpdateRequest } from "../../interfaces/quimicos/index";
import { Quimicos } from "../../entities/quimicos/quimico.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const quimicosListByIdService = async (id: string) => {
  const quimicoRepository = AppDataSource.getRepository(Quimicos);

  const quimico = await quimicoRepository.findOneBy({
    id,
  });

  if (!quimico) {
    throw new AppError("Produto Quimico não encontrado", 404);
  }
  
  return quimico;
};

export default quimicosListByIdService;

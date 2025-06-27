import { Quimicos } from "../../entities/quimicos/quimico.entity";
import { AppDataSource } from "../../data-source";

const quimicosListService = async () => {
  const quimicoRepository = AppDataSource.getRepository(Quimicos);

  const quimicos = await quimicoRepository.find()

  return quimicos;
};

export default quimicosListService;

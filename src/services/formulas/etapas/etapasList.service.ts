import { Etapa } from "../../../entities/formula/etapa.entity";
import { AppDataSource } from "../../../data-source";

const etapasListService = async () => {
  const etapasRepository = AppDataSource.getRepository(Etapa)

  const etapas = etapasRepository.find();

  return etapas
}

export default etapasListService;
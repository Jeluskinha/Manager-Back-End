import { Etapa } from "../../../entities/main_database/formula/etapa.entity";
import { VancourosDataSource } from "../../../database/data-source-main";

const etapasListService = async () => {
  const etapasRepository = VancourosDataSource.getRepository(Etapa)

  const etapas = etapasRepository.find();

  return etapas
}

export default etapasListService;
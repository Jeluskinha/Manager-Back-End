import { VancourosDataSource } from "../../../database/data-source-main";
import { Recebimento } from "../../../entities/main_database/quimicos/recebimento.entity";

const recebimentosListService = async () => {
  const recebimentosRepository = VancourosDataSource.getRepository(Recebimento);

  const recebimentos = await recebimentosRepository.find();

  return recebimentos;
};

export default recebimentosListService;

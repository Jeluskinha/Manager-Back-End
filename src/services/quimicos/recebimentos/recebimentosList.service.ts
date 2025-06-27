import { AppDataSource } from "../../../data-source";
import { Recebimentos } from "../../../entities/quimicos/recebimentos.entity";

const recebimentosListService = async () => {
  const recebimentosRepository = AppDataSource.getRepository(Recebimentos);

  // Inclua a relação 'quimico' na consulta
  const recebimentos = await recebimentosRepository.find();

  // const recebimentos = await recebimentosRepository.find({
  //   relations: ["quimico"]
  // }); dessa forma traz o recebimento e o quimico com o recebimento dentro sdad

  return recebimentos;
};

export default recebimentosListService;

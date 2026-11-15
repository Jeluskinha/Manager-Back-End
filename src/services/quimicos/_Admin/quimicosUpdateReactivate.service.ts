import { IQuimico } from "../../../interfaces/main_database/quimicos/index";

import { Quimico } from "../../../entities/main_database/quimicos/quimico.entity";

import { VancourosDataSource } from "../../../database/data-source-main";
import { AppError } from "../../../errors/appError";


const AdminQuimicosUpdateReativateService = async ({ produto, codigo }: IQuimico, id: string) => {
  const quimicoRepository = VancourosDataSource.getRepository(Quimico);

  const quimico = await quimicoRepository.findOneBy({
    id,
  });
  
  if (!quimico) {
    throw new AppError("Produto Quimico não encontrado", 404);
  }

  await quimicoRepository.update(id, {// atualizando Quimico na lista de Quimicos
    status: true,
  });

  // pegando o Quimico atualizado
  const quimicoAtualizado = await quimicoRepository.findOneBy({
    id,
  });

  return quimicoAtualizado;
};

export default AdminQuimicosUpdateReativateService;


// const recebimentos = await recebimentosRepository.find({
//   relations: ["quimico"]
// });

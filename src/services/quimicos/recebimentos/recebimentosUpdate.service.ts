import { IRecebimentosUpdate } from "../../../interfaces/quimicos/recebimentos";

import { Recebimentos } from "../../../entities/quimicos/recebimentos.entity";

import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors/appError";


const recebimentosUpdateService = async ({ produto, pesoBruto, pesoLiquido, recipiente, quantidade, fornecedor }: IRecebimentosUpdate,id: string) => {
  const recebimentosRepository = AppDataSource.getRepository(Recebimentos);


  const recebimento = await recebimentosRepository.findOneBy({
    id,
  });

  if (!recebimento) {
    throw new AppError("Recebimento não encontrado", 404);
  }

  await recebimentosRepository.update(id, {
    produto: produto ? produto : recebimento.produto,
    pesoBruto: pesoBruto ? pesoBruto : recebimento.pesoBruto,
    pesoLiquido: pesoLiquido ? pesoLiquido : recebimento.pesoLiquido,
    recipiente: recipiente ? recipiente : recebimento.recipiente,
    quantidade: quantidade ? quantidade : recebimento.quantidade,
    fornecedor: fornecedor ? fornecedor : recebimento.fornecedor
  });

  // atualizando Quimico na lista de Quimicos
  const recebimentoAtualizado = await recebimentosRepository.findOneBy({
    id,
  });

  return recebimentoAtualizado;
};

export default recebimentosUpdateService;

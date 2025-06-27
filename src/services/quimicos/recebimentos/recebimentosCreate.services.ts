import { Recebimentos } from "../../../entities/quimicos/recebimentos.entity";
import { IRecebimentosCreate } from "../../../interfaces/quimicos/recebimentos";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors/appError";
import { Quimicos } from "../../../entities/quimicos/quimico.entity";

 
const recebimentosCreateService = async ({ produto, pesoBruto, pesoLiquido, recipiente, quantidade, fornecedor, quimico } : IRecebimentosCreate) => {
  const recebimentosRepository = AppDataSource.getRepository(Recebimentos)

  const quimicosRepository =  AppDataSource.getRepository(Quimicos)
  const quimicoEncontrado = await quimicosRepository.findOneBy({nome: produto})


  if (!quimicoEncontrado) {
    throw new AppError("Produto Quimico não está cadastrado, registre-o antes e faça o lançamento novamente", 403)
  }

  

  const recebimento = new Recebimentos()
  recebimento.produto = produto
  recebimento.codigo = quimicoEncontrado.codigo
  recebimento.pesoBruto = pesoBruto
  recebimento.pesoLiquido =pesoLiquido
  recebimento.recipiente = recipiente
  recebimento.quantidade = quantidade
  recebimento.fornecedor = fornecedor
  recebimento.data = new Date
  recebimento.quimico = quimicoEncontrado

  recebimentosRepository.create(recebimento)
  await recebimentosRepository.save(recebimento)

  return recebimento
}

export default recebimentosCreateService
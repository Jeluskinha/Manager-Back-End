import { Recebimento } from "../../../entities/main_database/quimicos/recebimento.entity";
import { IRecebimentoCreate } from "../../../interfaces/main_database/quimicos/recebimento";
import { VancourosDataSource } from "../../../database/data-source-main";
import { AppError } from "../../../errors/appError";

import { Estoque } from "../../../entities/main_database/quimicos/estoque.entity";
import estoqueAjustarPesoLiquidoService, {
  validarPesoLiquido,
} from "../estoque/estoqueAjustarPesoLiquido.service";

const recebimentosCreateService = async ({ produto, peso_bruto, peso_liquido, tipo_recipiente, quantidade_recipiente, quantidade_pallet, recebido_por, atualizado_por, fornecedor } : IRecebimentoCreate) => {

  const pesoLiquido = validarPesoLiquido(peso_liquido)

  // recebimento e saldo do estoque são gravados na mesma transação (ou os dois, ou nenhum)
  return VancourosDataSource.transaction(async (manager) => {

    const quimicoEstocado = await manager.findOne(Estoque, {
      where: { produto: produto },
      loadEagerRelations: false, // não precisa carregar todos os recebimentos do estoque
    })

    if (!quimicoEstocado) {
      throw new AppError("Produto Quimico não está cadastrado, registre-o antes e faça o lançamento novamente", 403)
    }

    const recebimento = new Recebimento()
    recebimento.produto = produto
    // recebimento.codigo = quimicoEstocado.codigo // antes eu também registrava o código
    recebimento.peso_bruto = peso_bruto
    recebimento.peso_liquido = pesoLiquido
    recebimento.tipo_recipiente = tipo_recipiente
    recebimento.quantidade_recipiente = quantidade_recipiente
    recebimento.quantidade_pallet = quantidade_pallet

    recebimento.recebido_em = new Date
    recebimento.recebido_por = recebido_por
    recebimento.atualizado_em = new Date
    recebimento.atualizado_por = atualizado_por

    recebimento.lote = 'L01IN0225OUT0825COD0123'
    recebimento.fornecedor = fornecedor
    recebimento.estoque = quimicoEstocado  // entidade Estoque (registra o id do Quimico na tabela Estoque)

    await manager.save(recebimento)

    // incrementa o peso líquido do estoque com o que acabou de chegar
    await estoqueAjustarPesoLiquidoService(manager, quimicoEstocado.id, pesoLiquido, atualizado_por)

    // estoque já com o saldo atualizado (sem a lista de recebimentos, senão retorna todos junto)
    const estoqueAtualizado = await manager.findOne(Estoque, {
      where: { id: quimicoEstocado.id },
      loadEagerRelations: false,
    })

    return {
      ...recebimento,
      estoque: estoqueAtualizado,
    }
  })
}

export default recebimentosCreateService

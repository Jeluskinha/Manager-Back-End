import { Recebimento } from "../../../entities/main_database/quimicos/recebimento.entity";

import { VancourosDataSource } from "../../../database/data-source-main";
import { AppError } from "../../../errors/appError";
import estoqueAjustarPesoLiquidoService from "../estoque/estoqueAjustarPesoLiquido.service";


const recebimentosDeleteService = async (id: string) => {

  // exclui o recebimento e devolve o peso ao saldo do estoque na mesma transação
  return VancourosDataSource.transaction(async (manager) => {
    const recebimento = await manager.findOne(Recebimento, {
      where: { id },
      relations: { estoque: true },
      loadEagerRelations: false,
    })

    if(!recebimento){
        throw new AppError("recebimento não encontrado", 404)
    }

    if (recebimento.estoque) {
      // se o estoque ficaria negativo (ex.: parte já foi consumida) a exclusão é recusada (409)
      await estoqueAjustarPesoLiquidoService(manager, recebimento.estoque.id, -recebimento.peso_liquido, recebimento.atualizado_por)
    }

    await manager.delete(Recebimento, recebimento.id) // precisa definir o .id para deletar

    return 'recebimento'
  })
};

export default recebimentosDeleteService;

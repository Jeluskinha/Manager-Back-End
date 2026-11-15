import { IRecebimentoUpdate } from "../../../interfaces/main_database/quimicos/recebimento";

import { Recebimento } from "../../../entities/main_database/quimicos/recebimento.entity";
import { Estoque } from "../../../entities/main_database/quimicos/estoque.entity";

import { VancourosDataSource } from "../../../database/data-source-main";
import { AppError } from "../../../errors/appError";
import estoqueAjustarPesoLiquidoService, {
  validarPesoLiquido,
} from "../estoque/estoqueAjustarPesoLiquido.service";


const recebimentosUpdateService = async ({ produto, peso_bruto, peso_liquido, tipo_recipiente, quantidade_pallet, atualizado_por, quantidade_recipiente, fornecedor }: IRecebimentoUpdate,id: string) => {

  // recebimento e saldo(s) do estoque são atualizados na mesma transação
  return VancourosDataSource.transaction(async (manager) => {
    const recebimento = await manager.findOne(Recebimento, {
      where: { id },
      relations: { estoque: true },
      loadEagerRelations: false,
    });

    if (!recebimento) {
      throw new AppError("Recebimento não encontrado", 404);
    }

    const pesoAntigo = recebimento.peso_liquido;
    const informouPeso = peso_liquido !== undefined && peso_liquido !== null && (peso_liquido as unknown) !== "";
    const pesoNovo = informouPeso ? validarPesoLiquido(peso_liquido) : pesoAntigo;

    const estoqueAntigo = recebimento.estoque;
    let estoqueNovo: Estoque | null = estoqueAntigo;

    // se o produto foi trocado, o recebimento passa a pertencer a outro estoque
    if (produto) {
      estoqueNovo = await manager.findOne(Estoque, {
        where: { produto },
        loadEagerRelations: false,
      });

      if (!estoqueNovo) {
        throw new AppError("Produto Quimico não está cadastrado, registre-o antes e faça a alteração novamente", 403);
      }
    }

    if (!estoqueNovo) {
      throw new AppError("Recebimento sem estoque vinculado", 409);
    }

    // ajuste do saldo do estoque
    if (estoqueAntigo && estoqueAntigo.id === estoqueNovo.id) {
      // mesmo estoque: aplica só a diferença de peso
      await estoqueAjustarPesoLiquidoService(manager, estoqueNovo.id, pesoNovo - pesoAntigo, atualizado_por);
    } else {
      // outro estoque: tira do antigo e soma no novo
      if (estoqueAntigo) {
        await estoqueAjustarPesoLiquidoService(manager, estoqueAntigo.id, -pesoAntigo, atualizado_por);
      }
      await estoqueAjustarPesoLiquidoService(manager, estoqueNovo.id, pesoNovo, atualizado_por);
    }

    // campos omitidos mantêm o valor atual
    recebimento.produto = estoqueNovo.produto;
    recebimento.peso_bruto = peso_bruto ? peso_bruto : recebimento.peso_bruto;
    recebimento.peso_liquido = pesoNovo;
    recebimento.tipo_recipiente = tipo_recipiente ? tipo_recipiente : recebimento.tipo_recipiente;
    recebimento.quantidade_pallet = quantidade_pallet ? quantidade_pallet : recebimento.quantidade_pallet;
    recebimento.quantidade_recipiente = quantidade_recipiente ? quantidade_recipiente : recebimento.quantidade_recipiente;
    recebimento.fornecedor = fornecedor ? fornecedor : recebimento.fornecedor;
    recebimento.atualizado_por = atualizado_por ? atualizado_por : recebimento.atualizado_por;
    recebimento.atualizado_em = new Date();
    recebimento.estoque = estoqueNovo;

    await manager.save(recebimento);

    return manager.findOneBy(Recebimento, { id });
  });
};

export default recebimentosUpdateService;

import { EntityManager } from "typeorm";
import { Estoque } from "../../../entities/main_database/quimicos/estoque.entity";
import { AppError } from "../../../errors/appError";

// Converte e valida um peso líquido vindo da requisição (o front pode enviar string).
// Regra: inteiro maior ou igual a zero (mesmo tipo da coluna recebimento.peso_liquido).
const validarPesoLiquido = (valor: unknown): number => {
  const peso = typeof valor === "string" && valor.trim() === "" ? NaN : Number(valor);

  if (!Number.isInteger(peso) || peso < 0) {
    throw new AppError(
      "peso_liquido deve ser um número inteiro maior ou igual a zero",
      400
    );
  }

  return peso;
};

// Soma (delta > 0) ou subtrai (delta < 0) do peso líquido do Estoque de forma ATÔMICA no banco
// (UPDATE ... SET peso_liquido = peso_liquido + delta), sem ler e regravar o valor.
// - Deve ser chamado dentro de uma transação (use o `manager` dela) para que o recebimento
//   e o saldo do estoque sejam gravados juntos ou não sejam gravados.
// - Recusa a operação (409) se o estoque ficaria negativo.
const estoqueAjustarPesoLiquidoService = async (
  manager: EntityManager,
  estoqueId: string,
  delta: number,
  atualizadoPor?: string
) => {
  if (!Number.isInteger(delta)) {
    throw new AppError("peso_liquido deve ser um número inteiro", 400);
  }
  if (delta === 0) return;

  const campos: Record<string, unknown> = {
    // delta é um inteiro validado acima, por isso pode ser concatenado com segurança
    peso_liquido: () => `"peso_liquido" + ${delta}`,
    atualizado_em: new Date(),
  };
  if (atualizadoPor) campos.atualizado_por = atualizadoPor;

  const resultado = await manager
    .createQueryBuilder()
    .update(Estoque)
    .set(campos)
    .where(`"id" = :estoqueId AND "peso_liquido" + ${delta} >= 0`, { estoqueId })
    .execute();

  if (!resultado.affected) {
    throw new AppError(
      "Operação deixaria o peso líquido do estoque negativo",
      409
    );
  }
};

export default estoqueAjustarPesoLiquidoService;
export { validarPesoLiquido };

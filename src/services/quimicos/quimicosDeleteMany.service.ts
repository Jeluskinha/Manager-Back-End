import { Quimicos } from "../../entities/quimicos/quimico.entity";
import { AppDataSource } from "../../data-source";
import truncateTables from "../../scripts/truncate";
import { AppError } from "../../errors/appError";

const quimicosDeleteService = async () => {
  const quimicoRepository = AppDataSource.getRepository(Quimicos);

  const verificaSeExisteCadastro = await quimicoRepository.find();

  if (verificaSeExisteCadastro.length <= 0) {
    throw new AppError("Não há quimícos cadastrados", 409) // 409 -> conflict
  }

  // truncando tabelas recebimentos com quimicos (deletando todo os dados)
  // -> no futuro não será assim, ao invés de deletar eu irei fazer soft delete de quimicos evitando perder os dados de recebimentos também
  await truncateTables("recebimentos", "quimicos")
  .then(() => {
    console.log("Tabelas truncadas com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao truncar tabelas:", error);
  });

  return "Químicos excluídos com sucesso";
};

export default quimicosDeleteService;

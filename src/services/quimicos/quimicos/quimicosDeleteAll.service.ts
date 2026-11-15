import { Quimico } from "../../../entities/main_database/quimicos/quimico.entity";
import { VancourosDataSource } from "../../../database/data-source-main";
import truncateTables from "../../../scripts/truncate/truncate";
import { AppError } from "../../../errors/appError";


const quimicosDeleteAllService = async () => {
  const quimicoRepository = VancourosDataSource.getRepository(Quimico);

  const verificaSeExisteCadastro = await quimicoRepository.find();

  if (verificaSeExisteCadastro.length <= 0) {
    throw new AppError("Não há quimícos cadastrados", 409) // 409 -> conflict
  }

  // truncando tabelas recebimentos com quimicos (deletando todo os dados)
  // -> no futuro não será assim, ao invés de deletar eu irei fazer soft delete de quimicos evitando perder os dados de recebimentos também
  await truncateTables("recebimento", "quimico")
  .then(() => {
    console.log("Tabelas truncadas com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao truncar tabelas:", error);
  });

  return "Produtos químicos excluídos";
};

export default quimicosDeleteAllService;




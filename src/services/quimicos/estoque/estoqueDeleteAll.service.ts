
import { Estoque } from "../../../entities/main_database/quimicos/estoque.entity";
import { AppError } from "../../../errors/appError";
import { VancourosDataSource } from "../../../database/data-source-main";
import truncateTables from "../../../scripts/truncate/truncate";


const estoqueDeleteAllService = async () => {
  const estoqueRepository = VancourosDataSource.getRepository(Estoque)
   
  const verificaSeExisteCadastro = await estoqueRepository.find();

  if (verificaSeExisteCadastro.length <= 0) {
    throw new AppError("Não há quimícos cadastrados em Estoque", 409) // 409 -> conflict
  }

  // truncando tabelas recebimentos com quimicos (deletando todo os dados)
  // -> no futuro não será assim, ao invés de deletar eu irei fazer soft delete de quimicos evitando perder os dados de recebimentos também
  await truncateTables("quimico", "estoque")
  .then(() => {
    console.log("Tabelas truncadas com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao truncar tabelas:", error);
  });

  return "Estoque de químicos resetado";
};

export default estoqueDeleteAllService;

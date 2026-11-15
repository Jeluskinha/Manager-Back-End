
import { Estoque } from "../../../entities/main_database/quimicos/estoque.entity";
import { AppError } from "../../../errors/appError";
import { VancourosDataSource } from "../../../database/data-source-main";
import truncateTables from "../../../scripts/truncate/truncate";
import { Quimico } from "../../../entities/main_database/quimicos/quimico.entity";


const AdminEstoqueDeleteAllService = async () => { // deleta todos os quimicos e seu estoque ao mesmo tempo
  const quimicoRepository = VancourosDataSource.getRepository(Quimico);

  // const verificaSeExisteCadastro = await quimicoRepository.find({
  //     where: {
  //       status: false
  //     },
  //     loadEagerRelations: false // retorna apenas o Quimico -> não tras a relação com Estoque junto
  // });

  // if (verificaSeExisteCadastro.length <= 0) {
  //   throw new AppError("Não há quimícos cadastrados", 409) // 409 -> conflict
  // }

  // truncando tabelas recebimentos com quimicos (deletando todo os dados)
  // -> no futuro não será assim, ao invés de deletar eu irei fazer soft delete de quimicos evitando perder os dados de recebimentos também
  await truncateTables("quimico", "estoque")
  .then(() => {
    console.log("Tabelas truncadas com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao truncar tabelas:", error);
  });

  return "Químicos excluídos com sucesso";
};

export default AdminEstoqueDeleteAllService;

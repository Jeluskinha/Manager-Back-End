import { Quimico } from "../../../entities/main_database/quimicos/quimico.entity";
import { VancourosDataSource } from "../../../database/data-source-main";

const quimicosListService = async () => {
  
  const quimicoRepository = VancourosDataSource.getRepository(Quimico);

  const quimicos = await quimicoRepository.find({
    where: { status: true }, // ← apenas químicos ativos
    loadEagerRelations: false, // evita carregar relações
    order: { produto: "ASC" } // ordem alfabética garantida (sem ORDER BY o Postgres usa a ordem física das linhas)
  });

  return quimicos;
};

export default quimicosListService;

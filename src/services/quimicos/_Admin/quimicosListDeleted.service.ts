import { VancourosDataSource } from "../../../database/data-source-main";
import { Quimico } from "../../../entities/main_database/quimicos/quimico.entity";

const AdminQuimicosListDeletedService = async () => {
  const estoqueRepository = VancourosDataSource.getRepository(Quimico); 

  const estoque = await estoqueRepository.find({
      where: {
          status: false
        },
      loadEagerRelations: false // retorna apenas o Quimico -> não tras a relação com Estoque junto
    });

  return estoque
};

export default AdminQuimicosListDeletedService;

import { VancourosDataSource } from "../../database/data-source-main";
import { Artigo } from "../../entities/main_database/artigo/artigo.entity";

const artigoListService = async () => {
  const artigoRepository = VancourosDataSource.getRepository(Artigo);

  const artigos = artigoRepository.find();

  return artigos;
};

export default artigoListService;

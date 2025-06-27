import { AppDataSource } from "../../data-source";
import { Artigo } from "../../entities/artigo/artigo.entity";

const artigoListService = async () => {
  const artigoRepository = AppDataSource.getRepository(Artigo);

  const artigos = artigoRepository.find();

  return artigos;
};

export default artigoListService;

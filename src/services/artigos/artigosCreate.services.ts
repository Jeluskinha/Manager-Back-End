import { Artigo } from "../../entities/artigo/artigo.entity";
import { IArtigo } from "../../interfaces/artigos";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
 
const artigoCreateService = async ({nome, espessura, cor, fmvs} : IArtigo) => {
  const artigoRepository = AppDataSource.getRepository(Artigo)
  const artigos = await artigoRepository.find()

  const artigoAlreadyExists = artigos.find (artigos => artigos.nome === nome)
  const corAlreadyExists = artigos.find (artigos => artigos.cor === cor)

  if (artigoAlreadyExists && corAlreadyExists) {
    throw new AppError("Artigo já cadastrado", 403)
  }

  const artigo = new Artigo()
  artigo.nome = nome
  artigo.espessura = espessura
  artigo.cor = cor
  artigo.fmvs = fmvs
  artigo.createdAt = new Date
  artigo.updatedAt = new Date
  artigo.version = ''

  artigoRepository.create(artigo)
  await artigoRepository.save(artigo)

  return artigo
}

export default artigoCreateService
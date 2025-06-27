import { IEtapaCreate } from "../../../interfaces/formulas/etapas";
import { Etapa } from "../../../entities/formula/etapa.entity";
import { AppDataSource } from "../../../data-source"; 

import { Artigo } from "../../../entities/artigo/artigo.entity";
import { AppError } from "../../../errors/appError";
 
const etapaCreateService = async ({numero, duracao, velocidade, diretriz, artigo} : IEtapaCreate) => {

  const artigoRepository = AppDataSource.getRepository(Artigo)
  const etapaRepository = AppDataSource.getRepository(Etapa)

  const id = artigo

  const artigoEncontrado = await artigoRepository.findOneBy({
    id 
  })

  if (!artigoEncontrado) {
    throw new AppError("Artigo não encontrado", 404)
  }

  console.log()

  const etapa = new Etapa()
  etapa.numero = numero
  etapa.duracao = duracao
  etapa.velocidade = velocidade
  etapa.diretriz = diretriz ? diretriz : ""
  etapa.artigo = artigoEncontrado


  const etapaJaCadastrada = await etapaRepository.findOneBy({
    numero:etapa.numero
  })
  
  console.log(etapaJaCadastrada)
  if(etapaJaCadastrada){
    throw new AppError(`Etapa ${etapaJaCadastrada.numero} já foi cadastrada neste artigo`, 403)
  }
  

  etapaRepository.create(etapa)
  await etapaRepository.save(etapa)

  console.log(etapa.id)
  return etapa
}

export default etapaCreateService
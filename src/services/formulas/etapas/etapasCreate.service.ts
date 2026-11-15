import { IEtapaCreate } from "../../../interfaces/main_database/formulas/etapas";
import { Etapa } from "../../../entities/main_database/formula/etapa.entity";
import { VancourosDataSource } from "../../../database/data-source-main"; 

import { Artigo } from "../../../entities/main_database/artigo/artigo.entity";
import { AppError } from "../../../errors/appError";
 
const etapaCreateService = async ({numero, duracao, velocidade, diretriz, artigo} : IEtapaCreate) => {

  const artigoRepository = VancourosDataSource.getRepository(Artigo)
  const etapaRepository = VancourosDataSource.getRepository(Etapa)

  const id = artigo

  const artigoEncontrado = await artigoRepository.findOneBy({
    id 
  })

  if (!artigoEncontrado) {
    throw new AppError("Artigo não encontrado", 404)
  }


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

  //console.log(etapa.id)
  return etapa
}

export default etapaCreateService
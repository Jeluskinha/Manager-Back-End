import { IQuimicoUpdateRequest } from "../../interfaces/quimicos/index";

import { Quimicos } from "../../entities/quimicos/quimico.entity";
import { Recebimentos } from "../../entities/quimicos/recebimentos.entity";

import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const quimicosUpdateService = async ({ nome, codigo }: IQuimicoUpdateRequest,id: string) => {
  const quimicosRepository = AppDataSource.getRepository(Quimicos);

  const quimico = await quimicosRepository.findOneBy({
    id,
  });

  if (!quimico) {
    throw new AppError("Produto Quimico não encontrado", 404);
  }

  await quimicosRepository.update(id, {
    nome: nome ? nome : quimico.nome,
    // codigo: codigo ? codigo : quimico.codigo // temporariamente indisponivel para teste
  });

  // atualizando Quimico na lista de Quimicos
  const quimicoAtualizado = await quimicosRepository.findOneBy({
    id,
  });

  // caso o Quimico Editado tenha Recebimentos vinculados -> o mesmo precisa que todos os nomes sejam alterados
  // a validação abaixo fará isso
  const recebimentosRepository = AppDataSource.getRepository(Recebimentos);
  const recebimentos = await recebimentosRepository.findBy({
    codigo: quimico.codigo // precisamos achar por um identificador unico, optei pelo código ao invés do id para ficar visivel ao usuário
  });

  if(quimicoAtualizado!.recebimentos.length > 0 ){
  recebimentos.forEach(async(e)=> {
      await recebimentosRepository.update(e.id, {
        produto: nome ? nome : quimico.nome,
      });
    })
  }
  return quimicoAtualizado;
};

export default quimicosUpdateService;


// const recebimentos = await recebimentosRepository.find({
//   relations: ["quimico"]
// });

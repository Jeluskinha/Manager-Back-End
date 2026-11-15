import { IQuimico } from "../../../interfaces/main_database/quimicos/index";

import { Quimico } from "../../../entities/main_database/quimicos/quimico.entity";
import { Estoque } from "../../../entities/main_database/quimicos/estoque.entity";

import { VancourosDataSource } from "../../../database/data-source-main";
import { AppError } from "../../../errors/appError";

//scripts
import { atualizarVersãoProdutoQuimico } from '../../../scripts/atualizarVersoes/produtoQuimico'


const quimicosUpdateService = async ({ produto, codigo }: IQuimico, id: string) => {
  const quimicoRepository = VancourosDataSource.getRepository(Quimico);

  const quimico = await quimicoRepository.findOneBy({
    id,
  });

  if (!quimico) {
    throw new AppError("Produto Quimico não encontrado", 404);
  }

  await quimicoRepository.update(id, {// atualizando Quimico na lista de Quimicos
    produto: produto ? produto : quimico.produto,
    // codigo: codigo ? codigo : quimico.codigo // temporariamente indisponivel para teste
    versao:atualizarVersãoProdutoQuimico(quimico.versao),
    atualizado_em:  new Date,
  });

  // pegando o Quimico atualizado
  const quimicoAtualizado = await quimicoRepository.findOneBy({
    id,
  });

  // ao editar Quimico é preciso editar o mesmo vinculado em Estoque
  // a validação abaixo fará isso
  const estoqueRepository = VancourosDataSource.getRepository(Estoque);
  const quimcoEmEstoque = await estoqueRepository.findBy({
    codigo: quimico.codigo // precisamos achar por um identificador unico, optei pelo código ao invés do id para ficar visivel ao usuário
  });

  if(quimcoEmEstoque){
  quimcoEmEstoque.forEach(async(e)=> {
      await estoqueRepository.update(e.id, {
        produto: produto ? produto : quimico.produto,
      });
    })
  } else {
    throw new AppError("Quimico não encontrado na lista de Estoque", 404);
  }

  return quimicoAtualizado;
};

export default quimicosUpdateService;


// const recebimentos = await recebimentosRepository.find({
//   relations: ["quimico"]
// });

import { Quimico } from "../../../entities/main_database/quimicos/quimico.entity";
import { IQuimico, IQuimicoCreate } from "../../../interfaces/main_database/quimicos";
import { VancourosDataSource } from "../../../database/data-source-main";
import { AppError } from "../../../errors/appError";
import estoqueCreateService from "../estoque/estoqueCreate.service";

 
const quimicoCreateService = async ({produto, codigo} : IQuimico) => {
  
  // 1. Verifica se o Quimico já esta cadastrado
  const quimicoRepository = VancourosDataSource.getRepository(Quimico)
  const listaDeQuimico = await quimicoRepository.find()
  const quimicoJaExiste = listaDeQuimico.find(quimicos => quimicos.codigo === codigo)

  if (quimicoJaExiste) {
    throw new AppError(`${produto} já foi cadastrado`, 403)
  }
  // 2. cria o objeto de quimico e salva no banco
  const quimico: IQuimicoCreate = new Quimico()
  quimico.produto = produto
  quimico.codigo = codigo
  quimico.criado_em = new Date
  quimico.atualizado_em = new Date()
  quimico.atualizado_por = "Admin"
  quimico.versao = "120-7201-VS001"

  await quimicoRepository.save(quimico)

  // 3. Verifica se foi cadastrado 
  const listaNovaDeQuimico = await quimicoRepository.find()
  const quimicoCadastrado = listaNovaDeQuimico.find(quimicos => quimicos.codigo === codigo)

  if(quimicoCadastrado) { // cadastra Estoque 
     await estoqueCreateService({produto, codigo}, quimicoCadastrado)
  } else {
    throw new AppError(`chave 'quimico' não foi encontrada -> cadastrar Estoque falhou`, 409);
  }
 
  return quimico
}
 

export default quimicoCreateService
import { VancourosDataSource } from "../../../database/data-source-main";
import { Estoque } from "../../../entities/main_database/quimicos/estoque.entity";
import { IQuimico, IQuimicoCreate } from "../../../interfaces/main_database/quimicos";

const estoqueListByIdService = async (id: string) => {
  const estoqueRepository = VancourosDataSource.getRepository(Estoque); // tem que ser o repositório do Estoque porque precisa verificar o status

  // const estoque = await estoqueRepository.find();
 const estoque = await estoqueRepository.find({
    relations: ["quimico"], // esta linha trás a quimico como pai
    where: {
      id: id,
      quimico: {
        status: true
      }
    }
  });
  
  // Loop para remover as chaves indesejadas dentro de cada quimico -> trazendo apenas [produto, codigo]
   const resultado = estoque.map((item) => ({
    ...item,                        // copia todas as propriedades do estoque
    quimico: item.quimico
      ? { produto: item.quimico.produto, codigo: item.quimico.codigo}
      : null
  }));

  return resultado;
};

export default estoqueListByIdService;

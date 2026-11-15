import { VancourosDataSource } from "../../../database/data-source-main";
import { Estoque } from "../../../entities/main_database/quimicos/estoque.entity";

const estoqueListService = async () => {
  const estoqueRepository = VancourosDataSource.getRepository(Estoque); // tem que ser o repositório do Estoque porque precisa verificar o status

  // const estoque = await estoqueRepository.find();
 const estoque = await estoqueRepository.find({
    relations: ["quimico"],
    where: {
      quimico: {
        status: true
      }
    },
    // sem ORDER BY o Postgres devolve na ordem física das linhas (muda a cada UPDATE, ex.: ao registrar recebimento)
    order: { produto: "ASC" }
  });

  // Remove "recebimentos" e também filtra as chaves do "quimico"
  const resultado = estoque.map((item) => {
    const { recebimentos, ...estoqueSemRecebimentos } = item; // remove recebimentos
    return {
      ...estoqueSemRecebimentos,
      quimico: item.quimico
        ? { produto: item.quimico.produto, codigo: item.quimico.codigo }
        : null
    };
  }); // obs: retirei a chave recebimentos no retorno de "All" porque fica muito pluido (mas retorno no get por id)

  return resultado; 
};

export default estoqueListService;

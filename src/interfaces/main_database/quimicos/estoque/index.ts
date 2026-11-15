import { Quimico } from "../../../../entities/main_database/quimicos/quimico.entity"
import { Recebimento } from "../../../../entities/main_database/quimicos/recebimento.entity"

interface IEstoque {
  produto:string,
  codigo:string
}

interface IEstoqueCreate {
  produto:string,
  codigo:string,
  atualizado_em: Date,
  atualizado_por: string,
  quimico: Quimico
  // recebimentos: Recebimento // não sei se é preciso
}

interface IEstoqueUpdate{
  atualizado_em: Date,
  atualizado_por: string,
}


export { IEstoque, IEstoqueCreate, IEstoqueUpdate}
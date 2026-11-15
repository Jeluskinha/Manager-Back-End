import { Estoque } from "../../../../entities/main_database/quimicos/estoque.entity";

interface IRecebimento {
  /*
  idRecebimento: string,
  produto: string,
  peso_bruto:number,
  peso_liquido:number,
  tipo_recipiente:string,
  quantidade:number,
  fornecedor:string,
  idQuimico:string,
  */
} // rever este todo -> IRecebimento

interface IRecebimentoCreate {
  produto: string,
  peso_bruto:number,
  peso_liquido:number,
  tipo_recipiente:string,
  quantidade_recipiente:number,
  quantidade_pallet:number,

  recebido_em: Date,//readonly
  recebido_por:string,//readonly
  atualizado_em: Date,
  atualizado_por:string, 

  lote: string,//readonly
  fornecedor:string,
  estoque: Estoque
}

// PATCH: todos os campos são opcionais (o que for omitido mantém o valor atual)
interface IRecebimentoUpdate {
  produto?: string,
  peso_bruto?:number,
  peso_liquido?:number,
  tipo_recipiente?:string,
  quantidade_recipiente?:number,
  quantidade_pallet?:number,
  fornecedor?:string,
  atualizado_por?:string,
}


export {IRecebimentoCreate, IRecebimentoUpdate}
// export {IRecebimento, IRecebimentoCreate, IRecebimentoUpdate}
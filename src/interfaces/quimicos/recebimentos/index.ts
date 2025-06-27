import { Quimicos } from "../../../entities/quimicos/quimico.entity"

interface IRecebimentos {
  idRecebimento: string,
  produto: string,
  pesoBruto:number,
  pesoLiquido:number,
  recipiente:string,
  quantidade:number,
  fornecedor:string,
  idQuimico:string,
}

interface IRecebimentosCreate {
  produto: string,
  pesoBruto:number,
  pesoLiquido:number,
  recipiente:string,
  quantidade:number,
  fornecedor:string,
  data: Date;
  quimico: Quimicos
}

interface IRecebimentosUpdate {
  produto: string,
  pesoBruto:number,
  pesoLiquido:number,
  recipiente:string,
  quantidade:number,
  fornecedor:string,
}



export {IRecebimentos, IRecebimentosCreate, IRecebimentosUpdate}
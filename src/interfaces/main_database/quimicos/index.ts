import { IEstoque } from "./estoque"

interface IQuimico {
  produto:string
  codigo:string
}

interface IQuimicoCreate {
  produto:string
  codigo:string
  criado_em: Date
  atualizado_em: Date
  atualizado_por: string
  versao: string
  status: boolean
}

// interface IQuimicoUpdateRequest {
//   produto?: string
//   codigo?: string
// }


export { IQuimico, IQuimicoCreate}
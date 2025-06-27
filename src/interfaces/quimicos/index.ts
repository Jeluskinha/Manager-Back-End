interface IQuimico {
  nome:string
  codigo:string
}

interface IQuimicoCreate {
  nome:string
  codigo:string
  createdAt: Date
  updatedAt: Date
  version: string
  isActive: boolean
}

export interface IQuimicoUpdateRequest {
  nome?: string
  codigo?: string
}


export { IQuimico, IQuimicoCreate}
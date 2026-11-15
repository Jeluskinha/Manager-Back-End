interface IEtapa {
  numero: string;
  duracao: string;
  velocidade:string;
  diretriz?:string;
  artigo:string;
}

interface IEtapaCreate {
  numero: string;
  duracao: string;
  velocidade:string;
  diretriz?:string;
  artigo:string;
}


export { IEtapa, IEtapaCreate}
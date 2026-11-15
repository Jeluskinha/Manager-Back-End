interface IArtigo {
  nome: string;  
  espessura: string;
  cor:string;
  fmvs:string;
}

interface IArtigoCreate {
  nome: string;
  espessura: string;
  cor:string;
  fmvs:string;
}


export { IArtigo, IArtigoCreate}
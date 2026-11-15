import { Request, Response } from "express";
import estoqueDeleteAllService from "../../../services/quimicos/estoque/estoqueDeleteAll.service";


const estoqueDeleteAllController = async (req: Request, res: Response) => {
    const estoqueDeletado = await estoqueDeleteAllService();
    return res.status(200).json(estoqueDeletado);

  };
  

export default estoqueDeleteAllController;

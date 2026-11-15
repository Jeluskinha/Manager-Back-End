import { Request, Response } from "express";
import estoqueDeleteByIdService from "../../../services/quimicos/estoque/estoqueDeleteOne.service";


const estoqueDeleteByIdController = async (req: Request, res: Response) => {
    const id:string = req.params.id
    const estoqueDeletado = await estoqueDeleteByIdService(id);
    return res.status(200).json(estoqueDeletado);

  };
  
  

export default estoqueDeleteByIdController;

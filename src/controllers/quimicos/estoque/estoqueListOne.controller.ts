import { Request, Response } from "express";
import estoqueListByIdService from "../../../services/quimicos/estoque/estoqueListOne.service";


const estoqueListByIdController = async (req: Request, res: Response) => {

    const id:string = req.params.id
    const estoque = await estoqueListByIdService(id);
    return res.status(200).json(estoque);

  };
  
  
export default estoqueListByIdController;

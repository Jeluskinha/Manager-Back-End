import { Request, Response } from "express";
import estoqueListService from "../../../services/quimicos/estoque/estoqueListAll.service";


const estoqueListController = async (req: Request, res: Response) => {

    const estoque = await estoqueListService();
    return res.status(200).json(estoque);

  };
  
  
export default estoqueListController;

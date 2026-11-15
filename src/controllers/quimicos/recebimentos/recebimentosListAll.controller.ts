import { Request, Response } from "express";
import recebimentosListService from "../../../services/quimicos/recebimentos/recebimentosListAll.service";


const recebimentosListController = async (req: Request, res: Response) => {

    const recebimentos = await recebimentosListService();
    return res.status(200).json(recebimentos);

  };
  
  

export default recebimentosListController;

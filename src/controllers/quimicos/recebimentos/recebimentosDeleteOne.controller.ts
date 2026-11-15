import { Request, Response } from "express";
import recebimentosDeleteService from "../../../services/quimicos/recebimentos/recebimentosDeleteOne.service";
import { AppError, handleError } from "../../../errors/appError";

const recebimentosDeleteController = async (req: Request, res: Response) => {
 
    const id:string = req.params.id

    const recebimentoDeletado = await recebimentosDeleteService(id);

    return res.status(204).json({
        message: recebimentoDeletado
    });
  
};

export default recebimentosDeleteController;

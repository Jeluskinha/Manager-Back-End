import { Request, Response } from "express";
import estoqueUpdateService from "../../../services/quimicos/estoque/estoqueUpdate.service";
import { AppError, handleError } from "../../../errors/appError";
//import { validateKeys } from "../../../scripts/validateKeys - Obsoleto/validateKeys"; // apenas rotas de UPDATE


const estoqueUpdateController = async (req: Request, res: Response) => {
    try {
        const id:string = req.params.id
        const estoqueAtualizado = await estoqueUpdateService(id);
        return res.send(estoqueAtualizado);

    } catch (error) {
        
        if(error instanceof AppError){

            handleError(error, res)

        } 
    }
};

export default estoqueUpdateController;

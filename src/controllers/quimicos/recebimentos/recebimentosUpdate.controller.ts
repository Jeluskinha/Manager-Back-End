import { Request, Response } from "express";
import recebimentosUpdateService from "../../../services/quimicos/recebimentos/recebimentosUpdate.service";
// import recebimentosUpdateService from "../../services/recebimentos/recebimentosUpdate.service

const recebimentosUpdateController = async (req: Request, res: Response) => {

    const recebimento = req.body
    const id:string = req.params.id

    const quimicoAtualizado = await recebimentosUpdateService(recebimento, id);

    return res.send(quimicoAtualizado);
 
};

export default recebimentosUpdateController;

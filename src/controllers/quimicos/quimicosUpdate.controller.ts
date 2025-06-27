import { Request, Response } from "express";
import quimicosUpdateService from "../../services/quimicos/quimicosUpdate.service";

const quimicosUpdateController = async (req: Request, res: Response) => {

    const quimico = req.body
    const id:string = req.params.id

    const quimicoAtualizado = await quimicosUpdateService(quimico, id);

    return res.send(quimicoAtualizado);
 
};

export default quimicosUpdateController;

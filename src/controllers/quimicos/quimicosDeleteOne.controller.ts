import { Request, Response } from "express";
import quimicosDeleteByCodeService from "../../services/quimicos/quimicosDeleteOne.service";

const quimicosDeleteByCodeController = async (req: Request, res: Response) => {
    const id:string = req.params.id

    const quimicoAtualizado = await quimicosDeleteByCodeService(id);

    return res.send(quimicoAtualizado);
 
};

export default quimicosDeleteByCodeController;

import { Request, Response } from "express";
import quimicosDeleteService from "../../services/quimicos/quimicosDeleteMany.service";

const quimicosDeleteController = async (req: Request, res: Response) => {
    const quimicoAtualizado = await quimicosDeleteService();

    return res.send(quimicoAtualizado);
 
};

export default quimicosDeleteController;

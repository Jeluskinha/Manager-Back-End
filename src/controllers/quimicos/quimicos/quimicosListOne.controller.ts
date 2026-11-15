import { Request, Response } from "express";
import quimicosListByIdService from "../../../services/quimicos/quimicos/quimicosListOne.service";

const quimicosListByIdController = async (req: Request, res: Response) => {

    const id:string = req.params.id
    const quimicoAtualizado = await quimicosListByIdService(id);
    return res.send(quimicoAtualizado);
 
};

export default quimicosListByIdController;

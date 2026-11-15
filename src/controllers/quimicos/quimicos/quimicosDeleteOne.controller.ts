import { Request, Response } from "express";
import quimicosDeleteByCodeService from "../../../services/quimicos/quimicos/quimicosDeleteOne.service";

const quimicosDeleteByCodeController = async (req: Request, res: Response) => {

    const id:string = req.params.id
    const quimicoDeletado = await quimicosDeleteByCodeService(id);
    return res.send(quimicoDeletado);
 
};

export default quimicosDeleteByCodeController;

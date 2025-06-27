import { Request, Response } from "express";
import quimicosListService from "../../services/quimicos/quimicosListMany.service";

const quimicosListController = async (req: Request, res: Response) => {

    const quimicos = await quimicosListService();

    return res.send(quimicos);
 
};

export default quimicosListController;

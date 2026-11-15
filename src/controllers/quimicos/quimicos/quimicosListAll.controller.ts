import { Request, Response } from "express";
import quimicosListService from "../../../services/quimicos/quimicos/quimicosListAll.service";

const quimicosListController = async (req: Request, res: Response) => {
    const quimicos = await quimicosListService();
    return res.status(200).json(quimicos);
 
};

export default quimicosListController;

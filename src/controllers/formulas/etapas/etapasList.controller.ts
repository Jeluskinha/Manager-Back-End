import { Request, Response } from "express";
import etapasListService from "../../../services/formulas/etapas/etapasList.service";

const etapasListController = async (req: Request, res: Response) => {

    const users = await etapasListService();

    return res.send(users);
 
};

export default etapasListController;

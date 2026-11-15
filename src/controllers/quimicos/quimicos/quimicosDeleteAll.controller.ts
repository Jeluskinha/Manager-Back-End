import { Request, Response } from "express";
import quimicosDeleteAllService from "../../../services/quimicos/quimicos/quimicosDeleteAll.service";
import estoqueDeleteAllService from "../../../services/quimicos/estoque/estoqueDeleteAll.service";

const quimicosDeleteController = async (req: Request, res: Response) => {
    
    // const quimicoExcluido = await quimicosDeleteAllService();
    const estoqueExcluido = await estoqueDeleteAllService();
 
    // return res.send({quimicoExcluido, estoqueExcluido});
    return res.send({estoqueExcluido});
 
};

export default quimicosDeleteController;

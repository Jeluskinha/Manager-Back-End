import { Request, Response } from "express";
import AdminEstoqueDeleteAllService from "../../../services/quimicos/_Admin/quimicosDeleteMany.service";


const AdminEstoqueDeleteAllController = async (req: Request, res: Response) => { // deleta todos os quimicos e seu estoque ao mesmo tempo
    const estoqueDeletado = await AdminEstoqueDeleteAllService();
    return res.status(200).json({estoqueDeletado});
  };
  

export default AdminEstoqueDeleteAllController;

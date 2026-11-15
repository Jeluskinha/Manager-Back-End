import { Request, Response } from "express";
import AdminQuimicosListDeletedService from "../../../services/quimicos/_Admin/quimicosListDeleted.service";

const AdminQuimicosListDeletedController = async (req: Request, res: Response) => {

    const id:string = req.params.id
    const quimicoAtualizado = await AdminQuimicosListDeletedService();
    return res.send(quimicoAtualizado);
 
};

export default AdminQuimicosListDeletedController;

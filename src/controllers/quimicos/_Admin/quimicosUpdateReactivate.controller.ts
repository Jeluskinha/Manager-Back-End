import { Request, Response } from "express";
import AdminQuimicosUpdateReativateService from "../../../services/quimicos/_Admin/quimicosUpdateReactivate.service";
import { AppError, handleError } from "../../../errors/appError";
import { validateKeys } from "../../../scripts/validateKeys - Obsoleto/validateKeys"; // apenas rotas de UPDATE

const AdminQuimicosUpdateReativateController = async (req: Request, res: Response) => {
    // try {
        const quimico = req.body
        validateKeys(['produto', 'codigo'], quimico)
        const id:string = req.params.id
        const quimicoAtualizado = await AdminQuimicosUpdateReativateService(quimico, id);
        return res.send(quimicoAtualizado);

    // } catch (error) {
        
    //     if(error instanceof AppError){// se existir erro nos dados o SERVICE retornará pelo AppError

    //         handleError(error, res)

    //     } else { // se o erro for nos campos ['produto','codigo'] 
    
    //         return res.status(400).json({ 
    //                 error: 'dados inválidos',
    //                 message: 'Verifique os campos enviados.', 
    //                 details: {
    //                 expected_schema: {  // Esquema esperado 
    //                     "produto": "string",
    //                     "codigo": "string"
    //                     }
    //                 }
    //             });
                
    //      }
    // }
};

export default AdminQuimicosUpdateReativateController;

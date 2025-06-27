import { Request, Response } from "express";
import recebimentosListService from "../../../services/quimicos/recebimentos/recebimentosList.service";
import { AppError } from "../../../errors/appError";


const recebimentosListController = async (req: Request, res: Response) => {
    try {
      const recebimentos = await recebimentosListService();
      return res.status(200).json(recebimentos);
    } catch (error) {
      console.error(error);  // Adicione um log para capturar o erro
      return res.status(500).json({ error: "Nenhum histórico registrado" });
    }
  };
  
  

export default recebimentosListController;

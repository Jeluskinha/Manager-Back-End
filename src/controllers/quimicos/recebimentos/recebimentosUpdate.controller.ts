import { Request, Response } from "express";
import recebimentosUpdateService from "../../../services/quimicos/recebimentos/recebimentosUpdate.service";

// A validação dos campos fica em middlewares/recebimentos/validateUpdateRecebimento.middleware.
// Erros (AppError ou inesperados) seguem para o handleError.middleware, que padroniza a resposta
// e registra os inesperados no log (express-async-errors repassa o que for lançado aqui).
const recebimentosUpdateController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const recebimentoAtualizado = await recebimentosUpdateService(req.body, id);
  return res.send(recebimentoAtualizado);
};

export default recebimentosUpdateController;

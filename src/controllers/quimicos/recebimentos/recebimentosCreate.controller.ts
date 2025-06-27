import { Request, Response } from "express";
import recebimentosCreateService from "../../../services/quimicos/recebimentos/recebimentosCreate.services";

const recebimentosCreateController = async (req: Request, res: Response) => {
  const request = req.body;

  const newRecebimento = await recebimentosCreateService(request);

  return res.status(201).send(newRecebimento);
};

export default recebimentosCreateController;

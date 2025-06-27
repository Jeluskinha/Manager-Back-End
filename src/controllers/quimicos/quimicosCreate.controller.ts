import { Request, Response } from "express";
import quimicoCreateService from "../../services/quimicos/quimicosCreate.services";

const quimicosCreateController = async (req: Request, res: Response) => {
  const { nome, codigo } = req.body;

  const newQuimico = await quimicoCreateService({ nome, codigo });

  return res.status(201).send(newQuimico);
};

export default quimicosCreateController;

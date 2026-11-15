import { Request, Response } from "express";
import quimicoCreateService from "../../../services/quimicos/quimicos/quimicosCreate.service";

const quimicosCreateController = async (req: Request, res: Response) => {

  const { produto, codigo } = req.body;
  const newQuimico = await quimicoCreateService({ produto, codigo });
  return res.status(201).send(newQuimico);
  
};

export default quimicosCreateController;

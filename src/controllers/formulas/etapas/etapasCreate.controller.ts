import { Request, Response } from "express";
import etapaCreateService from "../../../services/formulas/etapas/etapasCreate.service";

const etapaCreateController = async (req: Request, res: Response) => {
  const { numero, duracao, velocidade, diretriz, artigo } = req.body;

  const novaEtapa = await etapaCreateService({ numero, duracao, velocidade, diretriz, artigo});

  return res.status(201).send(novaEtapa);
};

export default etapaCreateController;

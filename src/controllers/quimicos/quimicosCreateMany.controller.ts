import { Request, Response } from "express";
import quimicoCreateMuitosService from "../../services/quimicos/quimicosCreateMany.services";

const quimicosCreateMuitosController = async (req: Request, res: Response) => {
  const lista = req.body;

  const newQuimico = await quimicoCreateMuitosService(lista);

  return res.status(201).send(newQuimico);
};

export default quimicosCreateMuitosController;

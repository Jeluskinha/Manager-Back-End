import { Request, Response } from "express";
import artigoCreateService from "../../services/artigos/artigosCreate.services";

const artigoCreateController = async (req: Request, res: Response) => {
  const { nome, espessura, cor, fmvs } = req.body;

  const newArtigo = await artigoCreateService({ nome, espessura, cor, fmvs});

  return res.status(201).send(newArtigo);
};

export default artigoCreateController;

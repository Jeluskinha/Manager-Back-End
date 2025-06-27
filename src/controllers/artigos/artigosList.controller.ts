import { Request, Response } from "express";
import artigoListService from "../../services/artigos/artigosList.service";

const artigoListController = async (req: Request, res: Response) => {

    const artigos = await artigoListService();

    return res.send(artigos);
 
};

export default artigoListController;

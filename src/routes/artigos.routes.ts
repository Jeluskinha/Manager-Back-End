import { Router } from "express";
import artigoCreateController from "../controllers/artigos/artigosCreate.services";
import artigoListController from "../controllers/artigos/artigosList.controller";

const router = Router();

router.post("/", artigoCreateController);
router.get("/", artigoListController);

export default router;

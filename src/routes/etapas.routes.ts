import { Router } from "express";
import etapaCreateController from "../controllers/formulas/etapas/etapasCreate.controller";
import etapasListController from "../controllers/formulas/etapas/etapasList.controller";

const router = Router();

router.post("/", etapaCreateController);
router.get("/", etapasListController);

export default router;

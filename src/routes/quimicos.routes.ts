import { Router } from "express";
// Quimicos
import quimicosCreateController from "../controllers/quimicos/quimicosCreate.controller";
import quimicosCreateMuitosController from "../controllers/quimicos/quimicosCreateMany.controller";
import quimicosListByIdController from "../controllers/quimicos/quimicosListByCode.controller";
import quimicosListController from "../controllers/quimicos/quimicosListMany.controller";
import quimicosUpdateController from "../controllers/quimicos/quimicosUpdate.controller";
import quimicosDeleteByCodeController from "../controllers/quimicos/quimicosDeleteOne.controller";
import quimicosDeleteController from "../controllers/quimicos/quimicosDeleteMany.controller";
// Recebimentos
import recebimentosCreateController from "../controllers/quimicos/recebimentos/recebimentosCreate.controller";
import recebimentosListController from "../controllers/quimicos/recebimentos/recebimentosList.controller";
import recebimentosUpdateController from "../controllers/quimicos/recebimentos/recebimentosUpdate.controller";

const router = Router();

// Recebimentos
// *Recebimentos* tem que ficar nas linhas de cima -> senão /recebimentos será interpretado como /{:id}
router.post("/recebimentos", recebimentosCreateController);
router.get("/recebimentos", recebimentosListController);
router.patch("/recebimentos/:id", recebimentosUpdateController);

// Quimicos
router.post("/", quimicosCreateController);
router.post("/multiplos", quimicosCreateMuitosController);
router.get("/:id", quimicosListByIdController);
router.get("/", quimicosListController);
router.patch("/:id", quimicosUpdateController);
router.delete("/multiplos", quimicosDeleteController);
router.delete("/:id", quimicosDeleteByCodeController);




export default router;

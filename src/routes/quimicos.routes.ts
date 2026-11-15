import { Router } from "express";

//Admin
import AdminQuimicosCreateAllController from "../controllers/quimicos/_Admin/quimicosCreateMany.controller"; // post
import AdminQuimicosListDeletedController from "../controllers/quimicos/_Admin/quimicosListDeleted.controller"; // get
import AdminQuimicosUpdateReativateController from "../controllers/quimicos/_Admin/quimicosUpdateReactivate.controller"; // update
  import { validaUpdateQuimicoJSON } from "../middlewares/quimicos/validateUpdateQuimico.middleware"; // middleware
import AdminEstoqueDeleteAllController from "../controllers/quimicos/_Admin/quimicosDeleteMany.controller"; // delete

// Quimicos
import quimicosCreateController from "../controllers/quimicos/quimicos/quimicosCreate.controller"; // post
  import { validaCreateQuimicoJSON } from "../middlewares/quimicos/validateCreateQuimico.middleware"; // middleware
import quimicosListByIdController from "../controllers/quimicos/quimicos/quimicosListOne.controller"; // get
import quimicosListController from "../controllers/quimicos/quimicos/quimicosListAll.controller"; // get
import quimicosUpdateController from "../controllers/quimicos/quimicos/quimicosUpdate.controller"; // update
import quimicosDeleteController from "../controllers/quimicos/quimicos/quimicosDeleteAll.controller"; // delete
import quimicosDeleteByCodeController from "../controllers/quimicos/quimicos/quimicosDeleteOne.controller"; // delete
// Recebimentos
import recebimentosCreateController from "../controllers/quimicos/recebimentos/recebimentosCreate.controller"; // post
import recebimentosListController from "../controllers/quimicos/recebimentos/recebimentosListAll.controller"; // get
import recebimentosUpdateController from "../controllers/quimicos/recebimentos/recebimentosUpdate.controller"; // update
  import { validaUpdateRecebimentoJSON } from "../middlewares/recebimentos/validateUpdateRecebimento.middleware"; // middleware
import recebimentosDeleteController from "../controllers/quimicos/recebimentos/recebimentosDeleteOne.controller"; // delete
// Estoque
import estoqueListController from "../controllers/quimicos/estoque/estoqueListAll.controller"; // get
import estoqueListByIdController from "../controllers/quimicos/estoque/estoqueListOne.controller"; // get
import estoqueUpdateController from "../controllers/quimicos/estoque/estoqueUpdate.controller"; // update
import estoquesCreateController from "../controllers/quimicos/estoque/estoqueCreate.controller";
import estoqueDeleteAllController from "../controllers/quimicos/estoque/estoqueDeleteAll.controller";
import estoqueDeleteByIdController from "../controllers/quimicos/estoque/estoqueDeleteOne.controller";


// validaQuimicoJSON é um middlaware de tratamento de erro (AppError) 

const router = Router();

// rotas Administradoras -> criar e adicionar middleware de verificar Admin
router.post("/todos", AdminQuimicosCreateAllController); // cadastra todos os quimicos e cria o estoque ao mesmo tempo
router.get("/excluidos", AdminQuimicosListDeletedController); // lista Quimicos excluidos 
router.patch("/reativar/:id", validaUpdateQuimicoJSON, AdminQuimicosUpdateReativateController); // reativa Quimicos excluidos 
router.delete("/todos", AdminEstoqueDeleteAllController); // faz um truncate em Quimicos e Estoque (deleta todos permanente)

// Recebimentos
// tem que ficar a cima de Quimicos -> senão /recebimentos será interpretado como /{:id}
router.post("/recebimentos", recebimentosCreateController);
router.get("/recebimentos", recebimentosListController);
router.patch("/recebimentos/:id", validaUpdateRecebimentoJSON, recebimentosUpdateController);
router.delete("/recebimentos/:id", recebimentosDeleteController);

// Estoque
//router.post("/estoque", estoquesCreateController); // -> removidos  -> Quimicos sera responsavel por cadastrar e deletar(soft)
router.get("/estoque", estoqueListController);
router.get("/estoque/:id", estoqueListByIdController);
router.patch("/estoque/:id", estoqueUpdateController);
//router.delete("/estoque/multiplos", estoqueDeleteAllController); // -> removidos  -> Quimicos sera responsavel por cadastrar e deletar(soft)
//router.delete("/estoque/:id", estoqueDeleteByIdController);// -> removidos  -> Quimicos sera responsavel por cadastrar e deletar(soft)

// Quimicos
router.post("/", validaCreateQuimicoJSON, quimicosCreateController); 
router.get("/", quimicosListController);
router.get("/:id", quimicosListByIdController);
router.patch("/:id", quimicosUpdateController);
// router.delete("/multiplos", quimicosDeleteController); removidos -> agora esta em rotas Administradoras
router.delete("/:id", quimicosDeleteByCodeController);

/* EXCLUIR ROTAS COMENTADAS E SEUS CONTROLERS E SERVICES DEPOIS DE REVISAR - nota: 21/11/2025 */
export default router;

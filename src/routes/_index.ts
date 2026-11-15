import { Router } from "express";

import userRoutes from "./users.routes";
import artigoRoutes from "./artigos.routes";
import etapaRoutes from "./etapas.routes";
import quimicosRoutes from "./quimicos.routes";


const routes = Router();

routes.use("/users", userRoutes);
routes.use("/artigos", artigoRoutes);
routes.use("/etapas", etapaRoutes);
routes.use("/quimicos", quimicosRoutes); // unica rota em uso até o momento

// linha para subir branch de backup

export default routes;



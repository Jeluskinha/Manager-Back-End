import "dotenv/config";
import express from "express";
import "express-async-errors";
import routes from "./routes/_index";

import { requestLogger } from "./middlewares/debugRequest";
import handleErrorMiddleware from "./middlewares/handleError.middleware";

// app.ts só monta a aplicação Express (middlewares + rotas).
// Quem sobe o servidor e conecta nos bancos é o server.ts -> assim os testes podem importar o app sem abrir porta/conexão.
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

// estes Middleware são usados para debug em desenvolvimento -> poderão ser removidos ao finalizar
//app.use(jsonErrorHandler); // Middleware para capturar erros de parsing JSON (deve vir imediatamente após o express.json())
app.use(requestLogger); // Middleware de log (mostra método e URL)

app.use(routes);
// Middleware para tratamento de erros -> faz parte do sistema, não pode ser removido
app.use(handleErrorMiddleware);

export default app;

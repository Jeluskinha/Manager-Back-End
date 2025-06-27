import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import routes from "./routes/_index";

const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use(routes);

// teste
app.use(handleErrorMiddleware);
app.listen(3001, () => {
  console.log("Server running in port 3001");
});

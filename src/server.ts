import "dotenv/config";
import app from "./app";
import { initializeDatabases } from "./database";

const PORT = Number(process.env.PORT) || 3001;

initializeDatabases()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to databases", error);
    process.exit(1); // Encerra o processo se não conectar
  });

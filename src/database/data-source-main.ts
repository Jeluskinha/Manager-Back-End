import { DataSource } from "typeorm";
import { User } from "../entities/main_database/user.entity";
import { Artigo } from "../entities/main_database/artigo/artigo.entity";
import { Etapa } from "../entities/main_database/formula/etapa.entity";
// Quimico
import { Quimico } from "../entities/main_database/quimicos/quimico.entity";
import { Estoque } from "../entities/main_database/quimicos/estoque.entity";
import { Recebimento } from "../entities/main_database/quimicos/recebimento.entity";


// teste de abstração
let arr = [User, Artigo, Etapa, Quimico, Estoque, Recebimento]

require("dotenv").config();

export const VancourosDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST_MAIN || "localhost",
  port: Number(process.env.POSTGRES_PORT_MAIN) || 5432,

  username: process.env.POSTGRES_USER_MAIN,
  password: process.env.POSTGRES_PWD_MAIN,
  database: process.env.POSTGRES_DB_MAIN,

  synchronize: false,
  logging: false, // true -> exibirá as querys todas executadas na hora da request 
  // entities: ['src/entities/*.ts', 'src/entities/*.ts'],
  entities: [...arr],
  // relativo a este arquivo: funciona em src/ (ts-node) e em dist/ (js compilado)
  migrations: [__dirname + "/../migrations/main/*{.ts,.js}"],
});

// VancourosDataSource.initialize()
//   .then(() => {
//     console.log("Data Source initialized");
//   })
//   .catch((error) => {
//     console.error("Error during Data Source Initialization", error);
//   });

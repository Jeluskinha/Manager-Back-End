import { DataSource } from "typeorm";

import { RecebimentoLogTeste } from "../entities/rastreabilidade_database/quimicos/recebimentoLog.entity";
// teste de abstração
let arr = [RecebimentoLogTeste]

require("dotenv").config();

export const RastreabilidadeDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST_RASTREABILIDADE || "localhost",
  port: Number(process.env.POSTGRES_PORT_RASTREABILIDADE) || 5432,

  username: process.env.POSTGRES_USER_RASTREABILIDADE,
  password: process.env.POSTGRES_PWD_RASTREABILIDADE,
  database: process.env.POSTGRES_DB_RASTREABILIDADE,

  synchronize: false,
  logging: false, // true -> exibirá as querys todas executadas na hora da request 
  entities: [...arr],
  // entities: ['src/entities/*.ts', 'src/entities/*.ts'],
  // relativo a este arquivo: funciona em src/ (ts-node) e em dist/ (js compilado)
  migrations: [__dirname + "/../migrations/rastreabilidade/*{.ts,.js}"],
});

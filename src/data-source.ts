import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Artigo } from "./entities/artigo/artigo.entity";
import { Etapa } from "./entities/formula/etapa.entity";
import { Quimicos } from "./entities/quimicos/quimico.entity";
import { Recebimentos } from "./entities/quimicos/recebimentos.entity";

// teste de abstração
let arr = [User, Artigo, Etapa, Quimicos, Recebimentos]

require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost", 
  // host: "192.168.5.24",
  port: 5432,

  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PWD,
  database: process.env.POSTGRES_DB,

  synchronize: false,
  logging: true,
  entities: [...arr],
  // entities: ['src/entities/*.ts', 'src/entities/*.ts'],
  migrations: ["src/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized");
  })
  .catch((error) => {
    console.error("Error during Data Source Initialization", error);
  });

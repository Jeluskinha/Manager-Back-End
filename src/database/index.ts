import { VancourosDataSource } from "./data-source-main";
import { RastreabilidadeDataSource } from "./data-source-rastreabilidade";
import "dotenv/config";

export const dataSources = {
  main: VancourosDataSource,
  rastreabilidade: RastreabilidadeDataSource,
};

// Função para inicializar todas as conexões
export async function initializeDatabases() {
  try {
    await VancourosDataSource.initialize();
    console.log("Vancouros database connected");
    await RastreabilidadeDataSource.initialize();
    console.log("Rastreabilidade database connected");
  } catch (error) {
    console.error("Error initializing databases:", error);
    throw error;
  }
}
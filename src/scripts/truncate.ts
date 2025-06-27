import { AppDataSource } from "../data-source";

const truncateTables = async (primeiraTabela: string, segundaTabela: string) => {
  const queryRunner = AppDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.query(`TRUNCATE TABLE "${primeiraTabela}" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "${segundaTabela}" CASCADE`);

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};

export default truncateTables;


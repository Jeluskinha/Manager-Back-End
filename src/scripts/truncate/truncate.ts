import { VancourosDataSource } from "../../database/data-source-main";

const truncateTables = async (primeiraTabela: string, segundaTabela: string) => {
  const queryRunner = VancourosDataSource.createQueryRunner();

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

// comentado porque não é para usar por enquanto -> mudei toda a estrutura
export default truncateTables;


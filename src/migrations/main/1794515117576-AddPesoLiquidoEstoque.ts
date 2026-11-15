import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPesoLiquidoEstoque1794515117576 implements MigrationInterface {
    name = 'AddPesoLiquidoEstoque1794515117576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estoque" ADD "peso_liquido" integer NOT NULL DEFAULT '0'`);

        // preenche o saldo dos estoques já existentes com a soma dos recebimentos
        await queryRunner.query(`
            UPDATE "estoque" e
            SET "peso_liquido" = COALESCE(
                (SELECT SUM(r."peso_liquido") FROM "recebimento" r WHERE r."estoqueId" = e."id"), 0
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estoque" DROP COLUMN "peso_liquido"`);
    }

}

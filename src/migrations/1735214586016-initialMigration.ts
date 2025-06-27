import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1735214586016 implements MigrationInterface {
    name = 'InitialMigration1735214586016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recebimentos" ADD "codigo" character varying(9) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recebimentos" DROP COLUMN "codigo"`);
    }

}

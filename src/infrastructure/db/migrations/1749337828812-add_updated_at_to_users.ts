import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUpdatedAtToUsers1749337828812 implements MigrationInterface {
    name = 'AddUpdatedAtToUsers1749337828812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
    }

}

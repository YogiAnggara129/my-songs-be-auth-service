import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtColumnAtUsersTable1749337465044 implements MigrationInterface {
    name = 'AddCreatedAtColumnAtUsersTable1749337465044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    }

}

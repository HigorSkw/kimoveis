import { MigrationInterface, QueryRunner } from "typeorm";

export class createCart11User1666386366247 implements MigrationInterface {
    name = 'createCart11User1666386366247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_24cb25cc41f198a0a59d6e95fd3"`);
        await queryRunner.query(`ALTER TABLE "schedules" RENAME COLUMN "propertieId" TO "propertyId"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_98e2e6f75b2022d80c3eb4e4525" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_98e2e6f75b2022d80c3eb4e4525"`);
        await queryRunner.query(`ALTER TABLE "schedules" RENAME COLUMN "propertyId" TO "propertieId"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_24cb25cc41f198a0a59d6e95fd3" FOREIGN KEY ("propertieId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

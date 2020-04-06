import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1586168819804 implements MigrationInterface {
    name = 'PostRefactoring1586168819804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "publishedAt" SET DEFAULT null`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "publishedAt" DROP DEFAULT`, undefined);
    }

}

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1585924746017 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: "string",
                },
                {
                    name: 'email',
                    type: "string",
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: "string",
                },
                {
                    name: 'bio',
                    type: "text",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("user");
    }

}

import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterColumnIsActive1600181003219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('providers', 'is_active');
        await queryRunner.addColumn('providers',
            new TableColumn({
                name: 'is_active',
                type: 'boolean',
                default: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await await queryRunner.dropColumn('providers', 'is_active');
        await queryRunner.addColumn('providers',
            new TableColumn({
                name: 'is_active',
                type: 'boolean',
                isNullable: true,
              }),
        );
    }
}

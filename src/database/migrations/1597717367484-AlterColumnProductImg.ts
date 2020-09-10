import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterColumnProductImg1597717367484 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'product_image');
        await queryRunner.addColumn('products',
            new TableColumn({
                name: 'product_img',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await await queryRunner.dropColumn('products', 'product_img');
        await queryRunner.addColumn('products',
            new TableColumn({
                name: 'product_image',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

}

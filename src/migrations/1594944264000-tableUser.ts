import {MigrationInterface, QueryRunner} from "typeorm";

export class tableUser1594944264000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
            .query(`
                INSERT INTO "role"
                VALUES (1, 'ADMIN')
            `);

        await queryRunner
            .query(`
                INSERT INTO "user" 
                VALUES (1, 'admin', 'admin@gmail.com', 27, '$2b$08$3ehmgsfC.k1wL1AXwqgKheTyMyvl.YDvr/EpBiT.VGOVlvj.itxlK', '01/01/98 23:59:59.995', '01/01/98 23:59:59.995', 1)
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
            .query(`
                DELETE FROM "user" 
                WHERE id = 1)
            `);
    }

}

import { getDBConnection } from '../../database';

export class Student {
    constructor() {
        this.tableName = 'students';
        this.DBConnection = getDBConnection();

        this.up = this.up.bind(this);
    }

    async up() {
        const tableExists = await this.DBConnection.schema.hasTable(
            this.tableName
        );
        if (!tableExists) {
            await this.DBConnection.schema.createTable(this.tableName, t => {
                t.string('id')
                    .notNullable()
                    .primary();
                t.string('school_id', 225);
                t.string('name', 225);
                t.text('photo_url');
            });
        }
    }
}

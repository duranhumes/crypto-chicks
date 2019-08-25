import { getDBConnection } from '../../database';

export class Transaction {
    constructor() {
        this.tableName = 'transactions';
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
                t.string('student_id', 225);
                t.string('vendor_id', 225);
                t.timestamp('created_at').defaultTo(getDBConnection().fn.now());
            });
        }
    }
}

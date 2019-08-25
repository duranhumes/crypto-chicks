import { getDBConnection } from '../../database';
import { Transaction } from '../entities/Transaction';
import { promiseWrapper, isEmpty, formattedUUID } from '../../utils';

export class TransactionRepository {
    constructor() {
        this.tableName = 'transactions';
        this.db = getDBConnection()(this.tableName);

        const entity = new Transaction();
        entity.up();
    }

    findVendorTransactionsQuery(vendorId) {
        return new Promise(async (resolve, reject) => {
            const query = `
                SELECT t.id, t.created_at, v.name AS vendor_name, s.name AS student_name from ${this.tableName} t LEFT JOIN vendors v ON t.vendor_id = v.id LEFT JOIN students s ON t.student_id = s.id WHERE t.vendor_id = ?
            `;
            const [transactions, transactionsErr] = await promiseWrapper(
                getDBConnection().raw(query, vendorId)
            );

            if (transactionsErr) {
                return reject(transactionsErr);
            }

            if (!transactions || isEmpty(transactions)) {
                return resolve([]);
            }

            // @TEMP FIX FILTER - Need more time to go through knex and mysql docs to remove extra data returned by raw queries
            return resolve(transactions.filter(t => t.created_at));
        });
    }

    findStudentTransactionsQuery(studentId) {
        return new Promise(async (resolve, reject) => {
            const query = `
                SELECT t.id, t.created_at, v.name AS vendor_name, s.name AS student_name from ${this.tableName} t LEFT JOIN vendors v ON t.vendor_id = v.id LEFT JOIN students s ON t.student_id = s.id WHERE t.student_id = ?
            `;
            const [transactions, transactionsErr] = await promiseWrapper(
                getDBConnection().raw(query, studentId)
            );

            if (transactionsErr) {
                return reject(transactionsErr);
            }

            if (!transactions || isEmpty(transactions)) {
                return resolve([]);
            }

            // @TEMP FIX FILTER - Need more time to go through knex and mysql docs to remove extra data returned by raw queries
            return resolve(transactions.filter(t => t.created_at));
        });
    }

    findQuery(query = {}) {
        return new Promise(async (resolve, reject) => {
            const [transactions, transactionsErr] = await promiseWrapper(
                getDBConnection()
                    .select('*')
                    .where(query)
                    .from(this.tableName)
            );

            if (transactionsErr) {
                return reject(transactionsErr);
            }

            if (!transactions || isEmpty(transactions)) {
                return resolve([]);
            }

            return resolve(transactions);
        });
    }

    findOneQuery(query = {}) {
        return new Promise(async (resolve, reject) => {
            const [transactions, transactionsErr] = await promiseWrapper(
                this.db.where(query).first()
            );

            if (transactionsErr) {
                return reject(transactionsErr);
            }

            if (!transactions || isEmpty(transactions)) {
                return reject({ code: 404, message: 'Transaction not found' });
            }

            return resolve(transactions);
        });
    }

    create(transaction) {
        const id = formattedUUID();
        return new Promise(async (resolve, reject) => {
            const [, newTransactionErr] = await promiseWrapper(
                this.db.insert({ ...transaction, id })
            );

            if (newTransactionErr) {
                return reject(newTransactionErr);
            }

            const [newTransaction] = await promiseWrapper(
                getDBConnection()
                    .table(this.tableName)
                    .where({ id })
            );

            if (!newTransaction || isEmpty(newTransaction)) {
                return resolve(null);
            }

            return resolve(newTransaction);
        });
    }
}

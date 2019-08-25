import { Vendor } from '../entities/Vendor';
import { getDBConnection } from '../../database';
import { promiseWrapper, isEmpty, formattedUUID } from '../../utils';

export class VendorRepository {
    constructor() {
        this.tableName = 'vendors';
        this.db = getDBConnection()(this.tableName);

        const entity = new Vendor();
        entity.up();
    }

    findQuery(query = {}) {
        return new Promise(async (resolve, reject) => {
            const [vendors, vendorsErr] = await promiseWrapper(
                getDBConnection()
                    .select('*')
                    .from(this.tableName)
            );

            if (vendorsErr) {
                return reject(vendorsErr);
            }

            if (!vendors || isEmpty(vendors)) {
                return resolve([]);
            }

            return resolve(vendors);
        });
    }

    findOneQuery(query = {}) {
        return new Promise(async (resolve, reject) => {
            const [vendors, vendorsErr] = await promiseWrapper(
                this.db.where(query).first()
            );

            if (vendorsErr) {
                return reject(vendorsErr);
            }

            if (!vendors || isEmpty(vendors)) {
                return reject({ code: 404, message: 'Vendor not found' });
            }

            return resolve(vendors);
        });
    }

    create(vendor) {
        const id = formattedUUID();
        return new Promise(async (resolve, reject) => {
            const [, newVendorErr] = await promiseWrapper(
                this.db.insert({ ...vendor, id })
            );

            if (newVendorErr) {
                return reject(newVendorErr);
            }

            const [newVendor] = await promiseWrapper(
                getDBConnection()
                    .table(this.tableName)
                    .where({ id })
            );

            if (!newVendor || isEmpty(newVendor)) {
                return resolve(null);
            }

            return resolve(newVendor);
        });
    }
}

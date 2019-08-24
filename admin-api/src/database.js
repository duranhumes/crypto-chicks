import knex from 'knex';

import { consoleLog } from './bootstrap';

const DBHost = process.env.DB_HOST || '';
const DBUser = process.env.DB_USER || '';
const DBPassword = process.env.DB_PASSWORD || '';
const DBDatabase = process.env.DB_DATABASE || '';

const options = {
    client: 'mysql2',
    connection: {
        host: DBHost,
        user: DBUser,
        password: DBPassword,
        database: DBDatabase,
    },
};

export const getDBConnection = () => knex(options);

export const verifyDBConnection = async () => {
    return getDBConnection()
        .raw('SELECT 1+1 AS result')
        .then(() => consoleLog('DB is successfully connected!'))
        .catch(err => {
            consoleLog('Error in DB connection, %s', err.toString());
            process.exit(1);
        });
};

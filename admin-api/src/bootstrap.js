import debug from 'debug';

import server from './server';
import { verifyDBConnection } from './database';

const appName = process.env.APP_NAME;
const port = Number(process.env.APP_PORT);

export const consoleLog = debug('api');

consoleLog('Booting %s', appName);

async function main() {
    await verifyDBConnection();

    server.set('port', port);
    server.listen(port);
    server.on('error', onError);
    consoleLog('%s is ready for use on port %s', appName, port);
}

function onError(error) {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    switch (error.code) {
        case 'EACCES':
            consoleLog('%s requires elevated privileges', bind);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            consoleLog('%s is already in use', bind);
            process.exit(1);
            break;
        default:
            process.exit(1);
            throw error;
    }
}

process.on('uncaughtException', exception => {
    consoleLog('uncaughtException %s', exception.toString());

    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    consoleLog(
        'unhandledRejection %s, %s',
        promise.toString(),
        reason.toString()
    );

    process.exit(1);
});

// Clean up on nodemon restarts
process.once('SIGUSR2', () => {
    process.kill(process.pid, 'SIGUSR2');
});

process.on('exit', () => {
    consoleLog('Api shutdown');

    process.exit(0);
});

export default main;

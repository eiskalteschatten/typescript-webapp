import * as http from 'http';
import { AddressInfo } from 'net';

import mainApp from './app';

const port = 3025;

mainApp.setupApp().then(app => {
    function onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind: string = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    app.set('port', port);

    const server: http.Server = http.createServer(app);

    server.listen(port);
    server.on('error', onError);
    server.on('listening', () => {
        const address: (string | AddressInfo) = server.address();
        const bind: string = typeof address === 'string'
            ? 'pipe ' + address
            : 'port ' + address.port;
        console.log('Listening on', bind);
    });
}).catch(error => {
    console.error(error);
});

const http = require('http');
const WebSocketServer = require('websocket').server;

module.exports = class Websocket {
    constructor(websocketPort, connectionService, serviceProvider) {
        if (!websocketPort) throw new Error('[websocket] --websocket-port parameter required');
        this.websocketPort = websocketPort;
        this.conn = http.createServer();
        this.wsServer = new WebSocketServer({
            httpServer: this.conn
        });
        this.connectionService = connectionService;
        this.serviceProvider = serviceProvider;
    }

    run() {
        this.wsServer.on('request', (request) => {
            const connection = request.accept('echo-protocol', request.origin);
            const connectionUUID = this.connectionService.newConnection(connection);

            connection.on('message', (message) => this.serviceProvider.newMessage(message.utf8Data));
            connection.on('close', (reasonCode, description) => this.connectionService.stopConnection(connectionUUID));
        });
        this.conn.listen(this.websocketPort, 'localhost', () =>
            console.log(`listening on localhost:${this.websocketPort}`)
        );
    }
}



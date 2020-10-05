const { v4:uuidv4 } = require('uuid');

module.exports = class ConnectionService {
    constructor() {
        this.connections = new Map();
    }

    newConnection(connection) {
        let connectionUUID = uuidv4();
        this.connections.set(connectionUUID, connection);
        console.log('__CONNECTION__ADDED__');
        console.log(connectionUUID);
        console.log('__CONNECTIONS__');

        return connectionUUID;
    }

    stopConnection(connectionUUID) {
        console.log('__STOP_CONNECTION__');
        console.log(connectionUUID);
        this.connections.delete(connectionUUID);
    }

    sendMessages(message) {
        for (const connection of this.connections.values()) {
            connection.send(message);
        }
    }
}

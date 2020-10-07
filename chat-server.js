const {httpPort, websocketPort, redisAddress} = require('./app/config/config.js');
const Http = require('./app/servers/http.js');
const WebSocket = require('./app/servers/websocket.js');
const ConnectionService = require('./app/services/connectionService.js');
const ServiceProvider = require('./app/providers/serviceProvider.js');
const RedisSubscriberConnection = require('./app/connections/redisSubscriberConnection.js');
const RedisPublisherConnection = require('./app/connections/redisPublisherConnection.js');

const httpServer = new Http(httpPort, websocketPort);
httpServer.run();

const connectionService = new ConnectionService();
const serviceProvider = new ServiceProvider(connectionService);

if (redisAddress) {
    new RedisSubscriberConnection(redisAddress, connectionService);
    new RedisPublisherConnection(redisAddress, serviceProvider);
}

const websocketServer = new WebSocket(websocketPort, connectionService, serviceProvider);
websocketServer.run();

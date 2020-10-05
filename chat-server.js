const {httpPort, websocketPort, redisAddress} = require('./app/config/config.js');
const Http = require('./app/servers/http.js');
const WebSocket = require('./app/servers/websocket.js');
const ConnectionService = require('./app/services/connectionService.js');
const ChartService = require('./app/services/chartService.js');


const httpServer = new Http(httpPort, websocketPort);

const connectionService = new ConnectionService();
const chartService = new ChartService(connectionService, redisAddress);

const websocketServer = new WebSocket(websocketPort, connectionService, chartService);
websocketServer.run();
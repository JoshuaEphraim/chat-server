var {httpPort,websocketPort} = require('./app/config/config.js');
var Http = require('./app/servers/http.js');

let http = new Http(httpPort)
http.run()
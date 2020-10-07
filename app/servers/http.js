const express = require('express');
const mustacheExpress = require('mustache-express');

module.exports = class Http {
    constructor(httpPort, websocketPort) {
        if (!httpPort) throw new Error('[http] --http-port parameter required');
        this.httpPort = httpPort;
        this.websocketPort = websocketPort;
        this.http = express();
        this.http.engine('mustache', mustacheExpress());
        this.http.set('views', './views');
        this.http.set('view engine', 'mustache');
    }

    run() {
        this.http.get("/", (request, response) => {
            response.render('chat', {
                websocketPort: this.websocketPort
            });
        });
        this.http.listen(this.httpPort, 'localhost', () =>
            console.log(`listening on localhost:${this.httpPort}`));
    }
}
const express = require('express');
const path = require("path");
const mustacheExpress = require('mustache-express');

module.exports = class Http {
    constructor(httpPort, websocketPort) {
        this.http = express();
        this.http.engine('mustache', mustacheExpress());
        this.http.set('views', './views');
        this.http.set('view engine', 'mustache');
        this.http.get("/", (request, response) => {
            response.render('chat', {
                websocketPort: websocketPort
            });
        });
        this.http.listen(httpPort, 'localhost', () =>
            console.log(`listening on localhost:${httpPort}`));
    }
}
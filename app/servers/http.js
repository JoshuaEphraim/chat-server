var express = require('express');
var path = require("path");

module.exports = class Http {
    constructor(httpPort) {
        this.http = express()
        this.httpPort = httpPort
    }

    run () {
        this.http.get("/", function(request, response) {
            response.sendFile(path.join(__dirname + '/../../resources/chat.html'));
        });
        this.http.listen(this.httpPort, 'localhost', function() {
            console.log(`listening on localhost:${this.httpPort}`)
        }.bind(this));
    }
}
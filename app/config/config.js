class Config {
    constructor() {
        const argv = process.argv.slice(2);
        argv.forEach((arg) => {
            const argValue = arg.split('=');
            switch (argValue[0]) {
                case '--http-port':
                    this.httpPort = argValue[1];
                    break;
                case '--websocket-port':
                    this.websocketPort = argValue[1];
                    break;
                case '--redis-address':
                    this.redisAddress = argValue[1];
                    break;
                default:
                    break;
            }
        });
    }
}

module.exports = new Config();

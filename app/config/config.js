class Config {
    constructor() {
        let argv = process.argv.slice(2);
        for (const arg of argv) {
            let argValue = arg.split('=')
            switch (argValue[0]) {
                case '--http-port':
                    this.httpPort = argValue[1]
                    break
                case '--websocket-port':
                    this.websocketPort = argValue[1]
                    break
            }
        }
    }
}

module.exports = new Config()
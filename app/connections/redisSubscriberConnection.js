const RedisConnection = require("./redisConnection.js");

let instance;
module.exports = class RedisSubscriberConnection extends RedisConnection {
    constructor(redisAddress, connectionService) {
        super(redisAddress);
        if (instance) {
            return instance;
        }
        console.log('__NEW_REDIS_SUBSCRIBER__');
        instance = this;
        this.client.subscribe(this.prefix);
        this.client.on('ready', () => {
            this.onMessage((channel, message) =>
                connectionService.sendMessages(message));
        })
            .on('error', function (err) {
                console.error('[redis] error', err);
            });

        return instance;
    }

    onMessage(messageHandler) {
        this.client.on("message", messageHandler);
    }
}
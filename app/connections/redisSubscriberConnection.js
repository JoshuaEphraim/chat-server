const RedisConnection = require("./redisConnection.js");

let instance;
module.exports = class RedisSubscriberConnection extends RedisConnection {
    constructor(redisAddress) {
        super(redisAddress)
        if (instance) {
            return instance;
        }
        console.log('__NEW_REDIS_SUBSCRIBER__');
        instance = this;
        this.client.subscribe(this.prefix);

        return instance;
    }

    onMessage(messageHandler) {
        this.client.on("message", messageHandler);
    }
}
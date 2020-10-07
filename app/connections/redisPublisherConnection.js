const RedisConnection = require("./redisConnection.js");

let instance;
module.exports = class RedisPublisherConnection extends RedisConnection {
    constructor(redisAddress, serviceProvider) {
        super(redisAddress);
        if (instance) {
            return instance;
        }
        console.log('__NEW_REDIS_PUBLISHER__');
        instance = this;

        this.client.publishAsync = (message) =>
            new Promise((resolve) => {
                this.client.publish(this.prefix, message, function (err) {
                    resolve(err);
                })
            });

        this.client.on('ready', () => {
            serviceProvider.newMessage = this.newMessage.bind(this);
        })
            .on('error', function (err) {
                console.error('[redis] error', err);
            });

        return instance;
    }

    newMessage(message) {
        this.client.publishAsync(message).then(err => {
            if (err) console.error(err);
        });
    }
}

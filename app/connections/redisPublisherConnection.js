const RedisConnection = require("./redisConnection.js");

let instance;
module.exports = class RedisPublisherConnection extends RedisConnection {
    constructor(redisAddress) {
        super(redisAddress)
        if (instance) {
            return instance;
        }
        console.log('__NEW_REDIS_PUBLISHER__');
        instance = this;

        this.client.publishAsync = (message) =>
            new Promise((resolve) => {
                this.client.publish(this.prefix, message, function(err, response) {
                    if (err) console.log(err);
                    if (response) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
            });

        return instance;
    }
}

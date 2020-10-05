const redis = require("redis");

module.exports = class RedisConnection {
    constructor(redisAddress) {
        this.client = redis.createClient(`redis://${redisAddress}`);
        this.prefix = 'chat-service';
    }
}

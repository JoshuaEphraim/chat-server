const RedisSubscriberConnection = require('../connections/redisSubscriberConnection.js');
const RedisPublisherConnection = require('../connections/redisPublisherConnection.js');

module.exports = class ChartService {
    constructor(connectionService, redisAddress) {
        this.connectionService = connectionService;

        if (!redisAddress) {
            return this;
        }
        const redisSubscriber = new RedisSubscriberConnection(redisAddress);
        redisSubscriber.onMessage((channel, message) =>
            this.connectionService.sendMessages(message));
        this.redisPublisher = new RedisPublisherConnection(redisAddress);
    }

    newMessage(message)
    {
        if (this.redisPublisher) {
            this.redisPublisher.client.publishAsync(message.utf8Data);

            return;
        }
        this.connectionService.sendMessages(message.utf8Data);
    }
}
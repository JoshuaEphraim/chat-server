module.exports = class ServiceProvider {
    constructor(connectionService) {
        this.newMessage = connectionService.sendMessages.bind(connectionService);
    }
}
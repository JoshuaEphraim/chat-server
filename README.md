# Chart-server

Simple chat server on node.js. 
Can handle any number of connections to exchange messages between them.
Support redis pub/sub connection to deliver messsages between different instances of this application, which connected to same redis host.
Has Dokerfile to run this application in docker environment.

### Basic launch
Clone repository.
Install dependencies.

```sh
$ npm install
```

You ready to run your server

```sh
$ node chat-server.js --http-port=8888 --websocket-port=9999
```

Also you can run server with redis pub/sub support

```sh
$ node chat-server.js --http-port=8888 --websocket-port=9999 --redis-address=127.0.0.1:6379
```

### Docker environment
Clone repository.
Build Docker image.

```sh
$ docker build -t chat-server:latest .
```

You ready to run your server

```sh
$ docker run --rm --net=host chat-server:latest --http-port=8888 --websocket-port=9999
```

Also you can run server with redis pub/sub support

```sh
$ docker run --rm --net=host chat-server:latest --http-port=8888 --websocket-port=9999 --redis-address=127.0.0.1:6379
```


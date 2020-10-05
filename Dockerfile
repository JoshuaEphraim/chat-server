FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y curl
RUN curl --silent --location https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential
COPY . /project

CMD node /project/chat-server.js --http-port=8888 --websocket-port=9999
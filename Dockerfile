FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y curl
RUN curl --silent --location https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install -y nodejs
COPY . ./

RUN npm install

WORKDIR ./
ENTRYPOINT ["node", "chat-server.js"]
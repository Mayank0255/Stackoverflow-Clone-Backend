FROM node:16.13.0-alpine
RUN mkdir -p /home/node/src
COPY . /home/node/src
COPY .env /home/node/src/.env
WORKDIR /home/node/src
RUN npm install
EXPOSE 5000
ENTRYPOINT [ "node", "index.js" ]
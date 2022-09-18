const redis = require('redis');

const config = require('./index');

let client;

(async () => {
  client = redis.createClient({
    socket: {
      host: config.REDIS.HOST,
      port: config.REDIS.PORT,
    },
    password: config.REDIS.PASSWORD,
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();
})();

module.exports = client;

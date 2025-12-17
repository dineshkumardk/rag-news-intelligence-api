const redis = require("redis");

const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

client.connect().then(() => {
  console.log("Redis connected");
}).catch(console.error);

module.exports = client;
const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();
const redisUrl = process.env.redisUri;
const client = redis.createClient({
  url: redisUrl,
  socket: {
    connectTimeout: 15000,
  },
});

client.on("ready", () => console.log("Redis ready"));
client.on("error", (err) => console.error(`Redis Error`, err));
client.on("connect", () => console.log("Connected Redis"));

const clientConnectionHandler = async () => {
  try {
    await client.connect();
  } catch (err) {
    console.log(err, "redis connection failed");
  }
};
module.exports = {
  clientConnectionHandler,
  client,
};

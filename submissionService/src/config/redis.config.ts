import Redis from "ioredis";
import serverConfig from "./server.config";

console.log(
  "Connecting to Redis:",
  serverConfig.REDIS_HOST,
  serverConfig.REDIS_PORT
);

const redis = new Redis({
  port: Number(serverConfig.REDIS_PORT!),
  host: serverConfig.REDIS_HOST,
  lazyConnect: true,
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (error) => {
  console.log("Error while connecting redis", error);
});

export default redis;

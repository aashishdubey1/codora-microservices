import { configDotenv } from "dotenv";

configDotenv();

export default {
  PORT: Number(process.env.PORT),
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  BUN_ENV: process.env.BUN_ENV,
  DB_URL: process.env.DB_URL,
};

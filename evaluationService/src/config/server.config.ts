import { configDotenv } from "dotenv";

configDotenv();

export default {
  PORT: process.env.PORT,
  BUN_ENV: process.env.BUN_ENV,
};

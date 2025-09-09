import { configDotenv } from "dotenv";

configDotenv();

export default {
  PORT: Number(process.env.PORT),
};

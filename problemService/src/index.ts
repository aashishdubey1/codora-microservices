import express, { urlencoded, type Express } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import serverConfig from "./config/server.config";

const app: Express = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.listen(serverConfig.PORT, () => {
  console.log(`server is running on port ${serverConfig.PORT}`);
});

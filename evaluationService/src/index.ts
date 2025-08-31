import express, {
  urlencoded,
  type Express,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import serverConfig from "./config/server.config";
import logger from "./config/logger.config";
import { StatusCodes } from "http-status-codes";

const app: Express = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.get("/health", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, message: "OK" });
});

app.listen(serverConfig.PORT, () => {
  logger.info(`server is running on port ${serverConfig.PORT}`);
});

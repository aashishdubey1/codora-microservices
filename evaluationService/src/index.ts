import express, {
  urlencoded,
  type Express,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import serverConfig from "./config/server.config";
import logger from "./config/logger.config";
import { StatusCodes } from "http-status-codes";
import redis from "./config/redis.config";
import sampleWorker from "./workers/sampleWorker";
import { addJob } from "./producers/sampleProducers";
import apiRoutes from "./routes";
import { sampleQueue } from "./queues/sampleQueue";

const app: Express = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.get("/health", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, message: "OK" });
});

app.get("/api", apiRoutes);

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullMQAdapter(sampleQueue)],
  serverAdapter: serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());

app.listen(serverConfig.PORT, async () => {
  logger.info(`server is running on port ${serverConfig.PORT}`);
  await redis.connect();

  addJob("sampleJob", {
    name: "Aashish",
    age: "23",
  });

  sampleWorker("sampleQueue");
});

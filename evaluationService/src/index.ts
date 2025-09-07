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
import redis from "./config/redis.config";
import sampleWorker from "./workers/sampleWorker";
import { addJob } from "./producers/sampleProducers";
import apiRoutes from "./routes";
import serverAdapter from "./config/bullBoard.config";
import { runPython } from "./containers/runPythonDocker";
import { runJava } from "./containers/runJavaDocker";

const app: Express = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.get("/health", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, message: "OK" });
});

app.use("/api", apiRoutes);

app.use("/ui/queues", serverAdapter.getRouter());

app.listen(serverConfig.PORT, async () => {
  logger.info(`server is running on port ${serverConfig.PORT}`);
  await redis.connect();

  const javaCode = `
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter an integer value:");
        String xAsString = sc.nextLine();
        int x = Integer.parseInt(xAsString);
        System.out.println("Value of x is " + x);
        for(int i = 0 ; i < x ; i++){
          System.out.println(i);
        }
        sc.close();
    }
}
`;

  await runJava(javaCode, "50");
});

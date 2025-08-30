import express, {
  urlencoded,
  type Express,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import serverConfig from "./config/server.config";
import apiRoutes from "./routes";
import { connectToDb } from "./config/db.config";

const app: Express = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

await connectToDb();

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "OK" });
});

app.use("/api/v1/", apiRoutes);

app.listen(serverConfig.PORT, async () => {
  console.log(`server is running on port ${serverConfig.PORT}`);
});

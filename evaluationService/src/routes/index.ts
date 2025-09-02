import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { addJob } from "../producers/sampleProducers";

const router = Router();

router.get("/add", (req: Request, res: Response, next: NextFunction) => {
  addJob("sampleJob", req.body);
});

export default router;

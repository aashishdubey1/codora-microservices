import { Router } from "express";
import v1Routes from "./v1/submission.routes";

const router = Router();

router.use("/v1", v1Routes);

export default router;

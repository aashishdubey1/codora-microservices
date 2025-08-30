import { Router } from "express";
import problemRoutes from "./problems.routes";
const router = Router();

router.use("/problems", problemRoutes);

export default router;

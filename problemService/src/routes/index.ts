import { Router } from "express";

const router = Router();

router.use("/problems", problemRoutes);

export default router;

import { Router } from "express";
import { ProblemController } from "../controller/problems.controller";
const router = Router();

const problemController = new ProblemController();

router.post("/", problemController.addProblem);

router.get("/", problemController.getAllProblem);

router.get("/:id", problemController.getProblemById);

router.patch("/:id", problemController.updateProblem);

router.delete("/:id", problemController.deleteProblem);

export default router;

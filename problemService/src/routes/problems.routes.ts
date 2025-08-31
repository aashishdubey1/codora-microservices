import { Router } from "express";
import { ProblemController } from "../controller/problems.controller";
import { validateSchema } from "../validators";
import {
  createProblemSchema,
  updateProblemSchema,
} from "../validators/problem.validatior";
const router = Router();

const problemController = new ProblemController();

router.post(
  "/",
  validateSchema(createProblemSchema),
  problemController.addProblem
);

router.get("/", problemController.getAllProblem);

router.get("/:id", problemController.getProblemById);

router.patch(
  "/:id",
  validateSchema(updateProblemSchema),
  problemController.updateProblem
);

router.delete("/:id", problemController.deleteProblem);

export default router;

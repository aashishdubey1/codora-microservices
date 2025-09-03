import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { validate } from "../../middlewares/validate";
import { createSubmissionSchema } from "../../types/submission";
import { addSubmission } from "../../controllers/submissionController";

const router = Router();

router.post("/submission", validate(createSubmissionSchema), addSubmission);

export default router;

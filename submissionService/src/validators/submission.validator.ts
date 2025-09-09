import { z } from "zod";
import {
  SubmissionLanguage,
  SubmissionStatus,
} from "../models/submission.model";

// Schema for creating a new submission
export const createSubmissionSchema = z.object({
  problemId: z.string().min(1, "Problem ID is required"),
  code: z.string().min(1, "Code is required"),
  language: z.enum(
    SubmissionLanguage,
    "Language must be either 'cpp' , 'python' or 'java"
  ),
});

// Schema for updating submission status
export const updateSubmissionStatusSchema = z.object({
  status: z.enum(SubmissionStatus, {
    error:
      "Status must be one of: pending, compiling, running, accepted, wrong_answer",
  }), // ,
  submissionData: z.any(),
});

// Schema for query parameters (if needed for filtering)
export const submissionQuerySchema = z.object({
  status: z.enum(SubmissionStatus).optional(),
  language: z.enum(SubmissionLanguage).optional(),
  limit: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().min(1).max(100))
    .optional(),
  page: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().min(1))
    .optional(),
});

export type SubmissionDataType = z.infer<typeof createSubmissionSchema>;

import { z } from "zod";

export const createSubmissionSchema = z.object({
  language: z.string(),
  code: z.string(),
  userId: z.string(),
  problemId: z.string(),
});

export type CreateSubmissionType = z.infer<typeof createSubmissionSchema>;

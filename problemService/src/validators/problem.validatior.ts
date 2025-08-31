import { z } from "zod";

export const createProblemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]),
  editorial: z.string().optional(),
  testCases: z.array(
    z.object({ input: z.string().min(1), output: z.string().min(1) })
  ),
});

export const updateProblemSchema = createProblemSchema.partial();

export type CreateProblemDto = z.infer<typeof createProblemSchema>;
export type UpdateProblemDto = z.infer<typeof updateProblemSchema>;

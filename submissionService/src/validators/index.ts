import type { FastifyReply, FastifyRequest } from "fastify";
import type { ZodError, ZodType } from "zod";

export const validateRequestBody = (schema: ZodType<any>) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      console.info("Validating request body");
      const parsed = await schema.parseAsync(req.body);
      req.body = parsed;
      console.info("Request body is valid");
    } catch (error) {
      const zodError = error as ZodError;

      const formattedErrors = zodError.issues.map((issue) => ({
        path: issue.path.join("."), // e.g. "problemId"
        message: issue.message, // e.g. "Problem ID is required"
      }));

      reply.code(400).send({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
      return;
    }
  };
};

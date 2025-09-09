import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createSubmissionSchema } from "../../../../validators/submission.validator";
import { validateRequestBody } from "../../../../validators";
import { SubmissionController } from "../../../../controller/submission.controller";

const submissionController = new SubmissionController();

async function submissionRouter(fastify: FastifyInstance) {
  fastify.get("/ping", (req: FastifyRequest, res: FastifyReply) => {
    return "pong";
  });
  fastify.post(
    "/",
    { preHandler: validateRequestBody(createSubmissionSchema) },
    submissionController.createSubmission
  );
}

export default submissionRouter;

import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

async function submissionRouter(fastify: FastifyInstance) {
  fastify.get("/ping", (req: FastifyRequest, res: FastifyReply) => {
    return "pong";
  });
  fastify.post("/", () => {});
}

export default submissionRouter;

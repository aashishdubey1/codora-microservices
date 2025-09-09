import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

async function app(fastify: FastifyInstance) {
  fastify.get("/", (req: FastifyRequest, res: FastifyReply) => {
    return "Hello";
  });
}

export default fp(app);

import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import apiRouter from "./routes/api/api.routes";

async function app(fastify: FastifyInstance) {
  await fastify.register(apiRouter, { prefix: "/api" });

  fastify.get("/", (req: FastifyRequest, res: FastifyReply) => {
    return "Hello";
  });
}

export default fp(app);

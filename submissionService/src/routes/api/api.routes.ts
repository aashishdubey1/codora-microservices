import type { FastifyInstance } from "fastify";
import v1Router from "./v1/v1.routes";

async function apiRouter(fastify: FastifyInstance) {
  fastify.register(v1Router, { prefix: "/v1" });
}

export default apiRouter;

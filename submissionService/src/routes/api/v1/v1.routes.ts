import type { FastifyInstance } from "fastify";
import submissionRouter from "./submission/submission.routes";

async function v1Router(fastify: FastifyInstance) {
  await fastify.register(submissionRouter, { prefix: "/submissions" });
}

export default v1Router;

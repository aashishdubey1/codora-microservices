import Fastify from "fastify";
import serverConfig from "./config/server.config";
import app from "./app";

const fastify = Fastify({ logger: true });

fastify.register(app);

fastify.listen({ port: serverConfig.PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server is runnin of port", serverConfig.PORT);
});

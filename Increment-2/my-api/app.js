require("dotenv").config();

const path = require("path");
const cwd = process.cwd();

const dev = !process.env.PRODUCTION;

const port = dev ? 10443 : 80;
const host = "0.0.0.0";

const fastify = require("fastify")({
   logger: dev ? true : false,
});

fastify.register(require("@fastify/autoload"), {
   dir: path.join(cwd, "plugins"),
});

fastify.register(require("@fastify/autoload"), {
   dir: path.join(cwd, "routes"),
});

async function run() {
   try {
      await fastify.listen({ port, host });
   } catch (err) {
      fastify.log.error(err);
   }
}

run();

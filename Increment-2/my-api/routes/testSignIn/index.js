"use strict";

module.exports = async function (fastify, opts) {
   fastify.post("/", async function (request, reply) {
      let data = request.body;

      // ... test username + password logic

      let token = fastify.jwt.sign({
         username: data.username,
         password: data.password,
      });

      reply.send({
         token,
      });
   });
};

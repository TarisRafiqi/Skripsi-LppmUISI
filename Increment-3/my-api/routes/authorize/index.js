"use strict";

module.exports = async function (fastify, opts) {
   fastify.get("/", async function (request, reply) {
      console.log(request.headers);
      try {
         await request.jwtVerify();
         reply.send({
            auth: true,
         });
      } catch (err) {
         reply.send(err);
      }
   });
};

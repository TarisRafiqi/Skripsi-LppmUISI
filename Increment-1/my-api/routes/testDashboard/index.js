"use strict";

module.exports = async function (fastify, opts) {
   fastify.get(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const token = request.headers.authorization;
         let decodedToken = fastify.jwt.decode(token.replace("Bearer ", ""));
         reply.send({
            statusCode: 200,
            token,
            decodedToken,
            message: "Sukses memasuki dashboard!",
            // decodedToken,
         });
      }
   );
};

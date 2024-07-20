"use strict";

module.exports = async function (fastify, opts) {
   // Create Users
   fastify.post(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let connection;
         let token = request.headers.authorization;
         let decodedToken = fastify.jwt.decode(token.replace("Bearer ", ""));
         let roleFromToken = decodedToken.role;
         let data = request.body;
         const sql =
            "INSERT INTO users (username, password, email, active, role)  values(?, ?, ?, ?, ?)";

         try {
            connection = await fastify.mysql.getConnection();
            await connection.query(sql, [
               data.createUsername,
               data.createPassword,
               data.createEmail,
               data.selectedActivation,
               data.jenisRole,
            ]);
            connection.release();
            reply.send({
               msg: "Sukses menambahkan User",
            });
         } catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
               reply.code(409).send({
                  msg: "Username tersebut telah terdaftar",
                  error,
               });
            } else {
               reply.send({
                  msg: "Gagal menambahkan user",
                  error,
               });
            }
         }
      }
   );
};

"use strict";

module.exports = async function (fastify, opts) {
   // Create Users
   fastify.post("/", async function (request, reply) {
      let connection;
      let data = request.body;

      // reply.send({
      //    data,
      // });
      // return;

      const sql =
         "INSERT INTO users (username, password, email)  values(?, ?, ?)";

      try {
         connection = await fastify.mysql.getConnection();
         await connection.query(sql, [
            data.createUsername,
            data.createPassword,
            data.createEmail,
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
   });
};

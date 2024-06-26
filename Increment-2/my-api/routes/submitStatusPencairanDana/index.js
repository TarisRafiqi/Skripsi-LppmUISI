"use strict";

module.exports = async function (fastify, opts) {
   fastify.patch(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let dbData;
         let connection;
         let data = request.body;

         const sql = "UPDATE ppm SET status_pencairan_dana = ? WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [
               data.statusPencairanDana,
               data.id,
            ]);
            dbData = rows;
            connection.release();
            reply.send({
               dbData,
            });
         } catch (error) {
            reply.send({
               msg: "gagal terkoneksi ke db",
            });
         }
      }
   );
};

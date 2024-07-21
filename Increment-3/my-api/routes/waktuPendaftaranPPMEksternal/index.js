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
         let id = 1;

         const sql =
            "UPDATE waktu_pendaftaran_ppm SET buka_pendaftaran_hibah_eksternal = ? WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [
               data.pendaftaranHibahEksternal,
               id,
            ]);

            dbData = rows;
            connection.release();
            reply.send({
               dbData,
            });
         } catch (error) {
            reply.send({
               msg: "gagal terkoneksi ke db",
               error,
            });
         }
      }
   );
};

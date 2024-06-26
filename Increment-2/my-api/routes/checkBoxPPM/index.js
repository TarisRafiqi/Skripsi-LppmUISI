"use strict";

module.exports = async function (fastify, opts) {
   fastify.patch(
      "/:suratKontrak",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let dbData;
         let connection;
         let data = request.body;

         const sql = "UPDATE ppm SET ttd_surat_kontrak = ? WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [
               data.ttdSuratKontrak,
               data.ppmId,
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

   fastify.patch(
      "/:id/:presentasiPPM",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let dbData;
         let connection;
         let data = request.body;

         const sql = "UPDATE ppm SET presentasi_hasil_ppm = ? WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [
               data.presentasiHasilPPM,
               data.ppmId,
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

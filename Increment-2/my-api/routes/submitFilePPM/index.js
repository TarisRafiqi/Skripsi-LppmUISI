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

         const sql =
            "UPDATE ppm SET file_sk_pendanaan = ?, file_surat_kontrak = ?, file_surat_tugas = ?, file_sk_ppm = ? WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [
               data.fileSkPendanaanName,
               data.fileSuratKontrakName,
               data.fileSuratTugasName,
               data.fileSkPPMName,
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

   fastify.patch(
      "/:id",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let dbData;
         let connection;
         let data = request.body;

         const sql =
            "UPDATE ppm SET status = ?, file_hasil_ppm = ? WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [
               data.status,
               data.fileHasilPPMName,
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

"use strict";

module.exports = async function (fastify, opts) {
   fastify.post(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let data = request.body;
         let connection;
         const sql =
            "INSERT INTO riwayat_catatan_revisi_hasil_ppm (ppm_id, catatan_revisi_hasil_ppm, evaluator) values (?, ?, ?)";

         try {
            connection = await fastify.mysql.getConnection();
            await connection.query(sql, [
               data.ppmId,
               data.catatanRevisiHasilPPM,
               data.namaLengkapEvl,
            ]);
            connection.release();
            reply.send({
               msg: "Sukses Menambahkan Data",
            });
         } catch (error) {
            reply.send({
               msg: "gagal terkoneksi ke db",
               error,
            });
         }
      }
   );

   fastify.get(
      "/:id",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const id = Number(request.params.id);
         let dbData;
         let connection;
         const sql =
            "SELECT * FROM riwayat_catatan_revisi_hasil_ppm WHERE ppm_id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [id]);
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

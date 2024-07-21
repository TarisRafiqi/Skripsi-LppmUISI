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
            "UPDATE waktu_pendaftaran_ppm SET buka_pendaftaran_hibah_internal = ? WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [
               data.pendaftaranHibahInternal,
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

   fastify.patch(
      "/:time",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let dbData;
         let connection;
         let data = request.body;
         let id = 1;

         const sql =
            "UPDATE waktu_pendaftaran_ppm SET tanggal_mulai_hibah_internal = ?, tanggal_selesai_hibah_internal = ?, tanggal_mulai_ppm_mandiri = ?, tanggal_selesai_ppm_mandiri = ? WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [
               data.tanggalMulai_HibahInternal,
               data.tanggalSelesai_HibahInternal,
               data.tanggalMulai_PPMMandiri,
               data.tanggalSelesai_PPMMandiri,
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

   fastify.get(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let dbData;
         let connection;
         let id = 1;

         const sql = "SELECT * FROM waktu_pendaftaran_ppm WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [id]);
            dbData = rows[0];
            connection.release();
            reply.send({
               ...dbData,
            });
         } catch (error) {
            reply.send({
               error,
            });
         }
      }
   );
};

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
            "INSERT INTO riwayat_pendidikan_s1 (uid, nama_perguruan_tinggi, bidang_ilmu, tahun_masuk, tahun_lulus, judul_skripsi) values (?, ?, ?, ?, ?, ?)";

         try {
            connection = await fastify.mysql.getConnection();
            await connection.query(sql, [
               data.id,
               data.nama_pertiS1,
               data.bidang_ilmuS1,
               data.tahunMasukS1,
               data.tahunLulusS1,
               data.judulSkripsi,
            ]);
            connection.release();
            reply.send({
               msg: "Sukses Menambahkan Data",
               statusCode: 200,
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

         const sql = "SELECT * FROM riwayat_pendidikan_s1 WHERE uid = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [id]);
            dbData = rows;
            connection.release();
            reply.send({
               dbData,
               statusCode: 200,
            });
         } catch (error) {
            reply.send({
               error,
            });
         }
      }
   );

   fastify.delete(
      "/:id",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const id = Number(request.params.id);
         let connection;

         const sql = "DELETE FROM riwayat_pendidikan_s1 WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            await connection.query(sql, [id]);
            connection.release();
            reply.send({
               msg: "Sukses Menghapus Data",
               statusCode: 200,
            });
         } catch (error) {
            reply.send({
               error,
               msg: "gagal terkoneksi ke db",
            });
         }
      }
   );
};

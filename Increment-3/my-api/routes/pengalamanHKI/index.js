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
            "INSERT INTO pengalaman_hki (uid, tahun_hki, judul_hki, nama_penulis, jenis_hki, no_hki) values (?, ?, ?, ?, ?, ?)";

         try {
            connection = await fastify.mysql.getConnection();
            await connection.query(sql, [
               data.id,
               data.tahunHKI,
               data.JudulHKI,
               data.namaPenulisHKI,
               data.jenisHKI,
               data.noHKI,
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

         const sql = "SELECT * FROM pengalaman_hki WHERE uid = ?";

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
               msg: "gagal terkoneksi ke database",
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

         const sql = "DELETE FROM pengalaman_hki WHERE id = ?";

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

"use strict";

module.exports = async function (fastify, opts) {
   fastify.post("/", async function (request, reply) {
      let data = request.body;
      let connection;

      const sql =
         "INSERT INTO pengalaman_penulisanbuku (uid, tahun_buku, judul_buku, nama_penulis, penerbit, isbn) values (?, ?, ?, ?, ?, ?)";

      try {
         connection = await fastify.mysql.getConnection();
         await connection.query(sql, [
            data.id,
            data.tahunBuku,
            data.JudulBuku,
            data.namaPenulisBuku,
            data.PenerbitBuku,
            data.Isbn,
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
   });

   fastify.get("/:id", async function (request, reply) {
      const id = Number(request.params.id);
      let dbData;
      let connection;

      const sql = "SELECT * FROM pengalaman_penulisanbuku WHERE uid = ?";

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
            msg: "gagal terkoneksi ke database",
         });
      }
   });

   fastify.delete("/:id", async function (request, reply) {
      const id = Number(request.params.id);
      let connection;

      const sql = "DELETE FROM pengalaman_penulisanbuku WHERE id = ?";

      try {
         connection = await fastify.mysql.getConnection();
         await connection.query(sql, [id]);
         connection.release();
         reply.send({
            msg: "Sukses Menghapus Data",
         });
      } catch (error) {
         reply.send({
            error,
            msg: "gagal terkoneksi ke db",
         });
      }
   });
};

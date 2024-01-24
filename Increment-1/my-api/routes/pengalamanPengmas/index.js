"use strict";

module.exports = async function (fastify, opts) {
   fastify.post("/", async function (request, reply) {
      let data = request.body;
      let connection;

      // reply.send({
      //    data,
      // });
      // return;

      const sql =
         "INSERT INTO pengalaman_pengmas (uid, tahun_pengmas, judul_pengmas, role_pengmas, sumber_dana, jumlah) values (?, ?, ?, ?, ?, ?)";

      try {
         connection = await fastify.mysql.getConnection();
         await connection.query(sql, [
            data.id,
            data.tahunPengmas,
            data.judulPengmas,
            data.rolePengmas,
            data.sumberDanaPengmas,
            data.biayaPengmas,
         ]);
         connection.release();
         reply.send({
            msg: "Sukses Menambahkan Proposal",
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

      const sql = "SELECT * FROM pengalaman_pengmas WHERE uid = ?";

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

      // reply.send({
      //    data,
      // });
      // return;

      const sql = "DELETE FROM pengalaman_pengmas WHERE id = ?";

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

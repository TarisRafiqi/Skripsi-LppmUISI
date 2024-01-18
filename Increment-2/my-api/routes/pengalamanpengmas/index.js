"use strict";

module.exports = async function (fastify, opts) {
   fastify.get("/:id", async function (request, reply) {
      const id = Number(request.params.id);
      let dbData;
      let connection;

      const sql = "SELECT * FROM pengalaman_pengmas WHERE uid = ?";

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
            msg: "gagal terkoneksi ke db profile",
         });
      }
   });

   fastify.patch("/", async function (request, reply) {
      let dbData;
      let connection;
      let data = request.body;

      // reply.send({
      //    data,
      // });
      // return;

      const sql =
         "UPDATE pengalaman_pengmas SET tahun_pengmas = ?, judul_pengmas = ?, role_pengmas = ?, sumber_dana = ?, jumlah = ? WHERE uid = ?";

      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [
            JSON.stringify(data.aPM),
            JSON.stringify(data.bPM),
            JSON.stringify(data.cPM),
            JSON.stringify(data.dPM),
            JSON.stringify(data.ePM),
            data.id,
         ]);
         dbData = rows;
         connection.release();
         reply.send({
            sent: data,
            data: dbData,
            msg: "Berhasil menyimpan data baru!",
         });
      } catch (error) {
         reply.send({
            error,
            msg: "gagal terkoneksi ke db",
         });
      }
   });
};

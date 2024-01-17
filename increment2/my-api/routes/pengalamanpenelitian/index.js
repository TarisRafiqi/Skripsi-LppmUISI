"use strict";

module.exports = async function (fastify, opts) {
   fastify.get("/:id", async function (request, reply) {
      const id = Number(request.params.id);
      let dbData;
      let connection;

      const sql = "SELECT * FROM pengalaman_penelitian WHERE uid = ?";

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
         "UPDATE pengalaman_penelitian SET tahun_penelitian = ?, judul_penelitian = ?, role_penelitian = ?, sumber_dana = ?, jumlah = ? WHERE uid = ?";

      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [
            JSON.stringify(data.aPP),
            JSON.stringify(data.bPP),
            JSON.stringify(data.cPP),
            JSON.stringify(data.dPP),
            JSON.stringify(data.ePP),
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

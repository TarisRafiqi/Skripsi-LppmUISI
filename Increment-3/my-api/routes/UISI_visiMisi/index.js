"use strict";

module.exports = async function (fastify, opts) {
   fastify.get(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let dbData;
         let connection;

         const sql = "SELECT * FROM visi_misi";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, []);
            dbData = rows[0];
            connection.release();
            reply.send({
               dbData,
            });
         } catch (error) {
            reply.send({
               error,
            });
         }
      }
   );

   fastify.get("/:public", async function (request, reply) {
      let dbData;
      let connection;

      const sql = "SELECT visi, misi FROM visi_misi";

      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, []);
         dbData = rows[0];
         connection.release();
         reply.send({
            dbData,
         });
      } catch (error) {
         reply.send({
            error,
         });
      }
   });

   fastify.patch(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let data = request.body;
         let connection;
         let dbData;

         const sql = "UPDATE visi_misi SET visi = ?, misi = ? WHERE id = 1";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [data.visi, data.misi]);
            connection.release();
            reply.send({
               msg: "Sukses Mengubah Data",
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

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

         const sql = "SELECT * FROM profil_uisi";

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

      const sql = "SELECT profil FROM profil_uisi";

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

         const sql = "UPDATE profil_uisi SET profil = ? WHERE id = 1";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [data.profilUISI]);
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

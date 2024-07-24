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

         const sql = `SELECT COUNT(id) AS penelitianCounter FROM ppm WHERE jenis_kegiatan = 'penelitian'`;
         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql);
            dbData = rows[0];
            connection.release();

            reply.send({
               ...dbData,
               statusCode: 200,
            });
         } catch (error) {
            reply.send({
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
         let dbData;
         let connection;
         const uid = Number(request.params.id);
         const sql = `SELECT COUNT(uid) AS penelitianCounter FROM ppm WHERE JSON_CONTAINS(anggota_tim, '{"value": "${uid}" }') and jenis_kegiatan = 'penelitian'`;

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [uid]);
            dbData = rows[0];
            connection.release();

            reply.send({
               ...dbData,
               statusCode: 200,
            });
         } catch (error) {
            reply.send({
               error,
            });
         }
      }
   );
};

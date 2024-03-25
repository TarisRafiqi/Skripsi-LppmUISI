"use strict";

module.exports = async function (fastify, opts) {
   fastify.get("/", async function (request, reply) {
      let dbData;
      let connection;

      const sql = `SELECT COUNT(uid) AS pengmasCounter FROM proposal_ppm WHERE jenis_kegiatan = 'pengabdian masyarakat'`;
      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql);
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
   });

   fastify.get("/:id", async function (request, reply) {
      let dbData;
      let connection;
      const uid = Number(request.params.id);
      // const sql = `SELECT COUNT(uid) AS pengmasCounter FROM ppm WHERE JSON_CONTAINS(anggota_tim, '{"value": "${uid}" }') or uid = ? and jenis_kegiatan = 'pengabdian masyarakat'`;
      const sql = `SELECT COUNT(uid) AS pengmasCounter FROM proposal_ppm WHERE uid = ? and jenis_kegiatan = 'pengabdian masyarakat'`;

      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [uid]);
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
   });
};

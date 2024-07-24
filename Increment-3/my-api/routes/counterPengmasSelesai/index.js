"use strict";

module.exports = async function (fastify, opts) {
   fastify.get("/", async function (request, reply) {
      let dbData;
      let connection;

      const sql = `SELECT COUNT(id) AS counterPengmasSelesai FROM ppm WHERE jenis_kegiatan = 'pengabdian masyarakat' and status = 12`;
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
};

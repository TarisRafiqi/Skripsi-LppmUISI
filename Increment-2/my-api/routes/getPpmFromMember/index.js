"use strict";

module.exports = async function (fastify, opts) {
   fastify.get("/:id", async function (request, reply) {
      let dbData;
      let connection;
      const id = Number(request.params.id);
      const sql = `SELECT * FROM ppm where JSON_CONTAINS(anggota_tim, '{"value": "${id}" }')`;

      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql);
         dbData = rows;
         connection.release();

         reply.send({
            dbData,
         });
      } catch (error) {
         reply.send({
            msg: "gagal terkoneksi ke db",
         });
      }
   });
};

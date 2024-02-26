"use strict";

module.exports = async function (fastify, opts) {
   fastify.get("/", async function (request, reply) {
      let dbData;
      let connection;
      const uid = 49;

      // const sql = "SELECT * FROM ppm ";
      /**
      SELECT * FROM your_table
      WHERE JSON_CONTAINS(your_json_column, '{"key": "value"}');
       */
      let nama = "Mohammad Zabarzat";
      const sql = `SELECT * FROM ppm where JSON_CONTAINS(anggota_tim, '{"label": "${nama}" }')`;

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

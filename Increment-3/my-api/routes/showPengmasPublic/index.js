"use strict";

module.exports = async function (fastify, opts) {
   fastify.get("/", async function (request, reply) {
      let dbData;
      let connection;
      const sql =
         "SELECT id, judul, abstrak, jenis_skema, kelompok_keahlian, topik, biaya_penelitian, anggota_tim FROM ppm WHERE status = 12 AND jenis_kegiatan = 'pengabdian masyarakat'";

      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, []);
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

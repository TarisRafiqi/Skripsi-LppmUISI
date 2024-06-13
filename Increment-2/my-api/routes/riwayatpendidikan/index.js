"use strict";

module.exports = async function (fastify, opts) {
   fastify.get(
      "/:id",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const id = Number(request.params.id);
         let dbData;
         let connection;
         const sql = "SELECT * FROM riwayat_pendidikan WHERE uid = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [id]);
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

   fastify.patch(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let dbData;
         let connection;
         let data = request.body;

         const sql =
            "UPDATE riwayat_pendidikan SET nama_perti_s1 = ?, nama_perti_s2 = ?, nama_perti_s3 = ?, bidang_ilmu_s1 = ?, bidang_ilmu_s2 = ?, bidang_ilmu_s3 = ?, tahun_masuk_s1 = ?, tahun_masuk_s2 = ?, tahun_masuk_s3 = ?, tahun_lulus_s1 = ?, tahun_lulus_s2 = ?, tahun_lulus_s3 = ?, judul_tugasakhir_s1 = ?, judul_tugasakhir_s2 = ?, judul_tugasakhir_s3 = ?  WHERE uid = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [
               data.pertiS1,
               data.pertiS2,
               data.pertiS3,
               data.bidangIlmuS1,
               data.bidangIlmuS2,
               data.bidangIlmuS3,
               data.tahunMasukS1,
               data.tahunMasukS2,
               data.tahunMasukS3,
               data.tahunLulusS1,
               data.tahunLulusS2,
               data.tahunLulusS3,
               data.judulTugasAkhirS1,
               data.judulTugasAkhirS2,
               data.judulTugasAkhirS3,
               data.id,
            ]);
            dbData = rows;
            connection.release();
            reply.send({
               sent: data,
               data: dbData,
               statusCode: 200,
               msg: "Berhasil mengubah data",
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

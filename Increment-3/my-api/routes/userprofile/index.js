"use strict";

module.exports = async function (fastify, opts) {
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
            "UPDATE profile SET nama_lengkap = ?, jabatan_fungsional = ?, nip = ?, nidn = ?, tempat_lahir = ?, tanggal_lahir = ?, alamat_rumah = ?, telp_fax_rumah = ?, nomor_handphone = ?, alamat_kantor = ?, telp_fax_kantor = ?, email = ?, mata_kuliah = ? WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [
               data.namaLengkap,
               data.jabatanFungsional,
               data.nip,
               data.nidn,
               data.tempatLahir,
               data.tanggalLahir,
               data.alamatRumah,
               data.telpFaxRumah,
               data.nomorHandphone,
               data.alamatKantor,
               data.telpFaxKantor,
               data.email,
               JSON.stringify(data.mataKuliah),
               data.idProfile,
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

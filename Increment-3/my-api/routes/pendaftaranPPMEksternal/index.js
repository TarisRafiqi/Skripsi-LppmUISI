"use strict";

const e404 = `Code 400\nServer tidak dapat atau tidak akan memproses permintaan karena sesuatu yang dianggap sebagai kesalahan klien (misalnya format sintaks permintaan salah, pembingkaian pesan permintaan tidak valid, atau perutean permintaan tipu-tipu)`;

const e500 = `The server has encountered a situation it does not know how to handle.`;

module.exports = async function (fastify, opts) {
   fastify.post(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const token = request.headers.authorization;
         const decodedToken = fastify.jwt.decode(token.replace("Bearer ", ""));
         const roleFromToken = decodedToken.role;

         let connection;
         let data = request.body;

         const sql =
            "INSERT INTO ppm (uid, judul, abstrak, status, jenis_proposal, jenis_kegiatan, jenis_skema, kelompok_keahlian, topik, biaya_penelitian, anggota_tim, biodata_anggota, tanggal_mulai, tanggal_selesai, rab_file_name, ppm_file_name, kontrak_ppm_eksternal_file_name) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

         if (
            roleFromToken === "admin" ||
            roleFromToken === "dosen" ||
            roleFromToken === "reviewer" ||
            roleFromToken === "K.Departemen" ||
            roleFromToken === "K.LPPM" ||
            roleFromToken === "K.PusatKajian"
         ) {
            try {
               connection = await fastify.mysql.getConnection();
               await connection.query(sql, [
                  data.id,
                  data.judul,
                  data.myAbstract,
                  data.status,
                  data.jenisProposal,
                  data.jenisKegiatan,
                  data.jenisSkema,
                  data.kelompokKeahlian,
                  data.topik,
                  data.biayaPenelitian,
                  JSON.stringify(data.anggotaTim),
                  JSON.stringify(data.biodataAnggota),
                  data.tanggalMulai,
                  data.tanggalSelesai,
                  data.rabFileName,
                  data.ppmFileName,
                  data.kontrakFileName,
               ]);
               connection.release();
               reply.send({
                  msg: "Sukses Menambahkan Proposal",
               });
            } catch (error) {
               reply.send({
                  msg: "gagal terkoneksi ke db",
                  error,
               });
            }
         } else {
            reply.send({
               msg: "anda tidak memiliki hak akses halaman ini",
               error,
            });
         }
      }
   );
};

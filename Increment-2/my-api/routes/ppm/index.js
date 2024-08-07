"use strict";

const e404 = `Code 400\nServer tidak dapat atau tidak akan memproses permintaan karena sesuatu yang dianggap sebagai kesalahan klien (misalnya format sintaks permintaan salah, pembingkaian pesan permintaan tidak valid, atau perutean permintaan tipu-tipu)`;

const e500 = `The server has encountered a situation it does not know how to handle.`;

module.exports = async function (fastify, opts) {
   // API ini diakses oleh halaman Detail Proposal untuk meminta detail proposal dari id tsb
   // Get detail proposal
   fastify.get(
      "/:id",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const id = Number(request.params.id);
         const token = request.headers.authorization;
         const decodedToken = fastify.jwt.decode(token.replace("Bearer ", ""));
         const idFromToken = decodedToken.id;
         const roleFromToken = decodedToken.role;
         let dbData;
         let connection;

         if (
            roleFromToken === "admin" ||
            roleFromToken === "dosen" ||
            roleFromToken === "reviewer" ||
            roleFromToken === "K.Departemen" ||
            roleFromToken === "K.LPPM" ||
            roleFromToken === "K.PusatKajian"
         ) {
            const sql = "SELECT * FROM ppm WHERE id = ?";
            try {
               connection = await fastify.mysql.getConnection();
               const [rows] = await connection.query(sql, [id]);
               dbData = rows[0];
               connection.release();
               reply.send({
                  ...dbData,
               });
            } catch (error) {
               reply.send({
                  msg: "gagal terkoneksi ke db",
               });
            }
         } else {
            reply.send({
               msg: "Anda tidak memiliki hak akses halaman ini",
            });
         }
      }
   );

   // API ini diakses oleh halaman List Proposal untuk mengambil semua proposal/penelitian milik id tersebut.
   // Reseach by Id
   fastify.get(
      "/:id/:uid",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const uid = Number(request.params.uid);
         const token = request.headers.authorization;
         const decodedToken = fastify.jwt.decode(token.replace("Bearer ", ""));
         const idFromToken = decodedToken.id;
         const roleFromToken = decodedToken.role;
         let dbData;
         let connection;

         if (idFromToken === uid) {
            const sql = `SELECT * FROM ppm where JSON_CONTAINS(anggota_tim, '{"value": "${uid}" }')`;
            try {
               connection = await fastify.mysql.getConnection();
               const [rows] = await connection.query(sql, [uid]);
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
         }
      }
   );

   // Get all research
   fastify.get(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const token = request.headers.authorization;
         const decodedToken = fastify.jwt.decode(token.replace("Bearer ", ""));
         const roleFromToken = decodedToken.role;

         const sql =
            "SELECT id, uid, judul, jenis_kegiatan, jenis_skema, status FROM ppm";
         let dbData;
         let connection;

         if (roleFromToken === "admin") {
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
         } else {
            reply.send({
               pesan: "anda tidak memiliki hak akses halaman ini",
            });
         }
      }
   );

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
            "INSERT INTO ppm (uid, judul, abstrak, status, jenis_proposal, jenis_kegiatan, jenis_skema, kelompok_keahlian, topik, biaya_penelitian, anggota_tim, biodata_anggota, tanggal_mulai, tanggal_selesai, rab_file_name, ppm_file_name) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

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

   // edit
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
            "UPDATE ppm SET jenis_proposal = ?, jenis_kegiatan = ?, jenis_skema = ?, kelompok_keahlian = ?, topik = ?, tanggal_mulai = ?, tanggal_selesai = ?, biaya_penelitian = ?, anggota_tim = ?, biodata_anggota = ?, judul = ?, abstrak = ?, status = ?, uid_kdept = ?, uid_klppm = ?, uid_kpk = ?, uid_reviewer = ?, rab_file_name = ?, ppm_file_name = ? WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [
               data.jenisProposal,
               data.jenisKegiatan,
               data.jenisSkema,
               data.kelompokKeahlian,
               data.topik,
               data.tanggalMulai,
               data.tanggalSelesai,
               data.biayaPenelitian,
               JSON.stringify(data.anggotaTim),
               JSON.stringify(data.newBiodataAnggota),
               data.judul,
               data.abstrak,
               data.status,
               data.kdeptSelected,
               data.klppmSelected,
               data.kpkSelected,
               data.reviewerSelected,
               data.rabFileName,
               data.ppmFileName,
               data.id,
            ]);
            dbData = rows;
            connection.release();
            reply.send({
               dbData,
            });
         } catch (error) {
            reply.send({
               msg: "gagal terkoneksi ke db",
               error,
            });
         }
      }
   );
};

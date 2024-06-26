"use strict";

const { uid } = require("../../libs");

const e404 = `Code 400\nServer tidak dapat atau tidak akan memproses permintaan karena sesuatu yang dianggap sebagai kesalahan klien (misalnya format sintaks permintaan salah, pembingkaian pesan permintaan tidak valid, atau perutean permintaan tipu-tipu)`;

const e500 = `The server has encountered a situation it does not know how to handle.`;

module.exports = async function (fastify, opts) {
   // get users
   fastify.get(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const token = request.headers.authorization;
         let decodedToken = fastify.jwt.decode(token.replace("Bearer ", ""));
         const roleFromToken = decodedToken.role;

         let dbData;
         const sql = "SELECT uid, nama_lengkap FROM profile";
         let connection;

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
               const [rows] = await connection.query(sql, []);
               dbData = rows;
               connection.release();
               reply.send({
                  ...dbData,
                  statusCode: 200,
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
};

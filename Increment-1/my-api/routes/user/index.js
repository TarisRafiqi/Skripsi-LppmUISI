"use strict";

const { uid } = require("../../libs");

const e404 = `Code 400\nServer tidak dapat atau tidak akan memproses permintaan karena sesuatu yang dianggap sebagai kesalahan klien (misalnya format sintaks permintaan salah, pembingkaian pesan permintaan tidak valid, atau perutean permintaan tipu-tipu)`;

const e500 = `The server has encountered a situation it does not know how to handle.`;

module.exports = async function (fastify, opts) {
   // get detail user aka profile
   fastify.get(
      "/:id",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const id = Number(request.params.id);
         const token = request.headers.authorization;
         let decodedToken = fastify.jwt.decode(token.replace("Bearer ", ""));
         const idFromToken = decodedToken.id;
         const roleFromToken = decodedToken.role;
         let dbData;
         let connection;

         if (idFromToken === id) {
            const sql = "SELECT * FROM profile WHERE uid = ?";

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
                  msg: "gagal terkoneksi ke db profile",
               });
            }
         } else if (
            roleFromToken === "admin" ||
            roleFromToken === "dosen" ||
            roleFromToken === "Ka.Departemen" ||
            roleFromToken === "reviewer" ||
            roleFromToken === "Ka.LPPM" ||
            roleFromToken === "Ka.PusatKajian"
         ) {
            const sql = "SELECT * FROM profile WHERE uid = ?";

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
                  msg: "gagal terkoneksi ke db profile",
               });
            }
         } else {
            reply.send({
               msg: "Anda tidak memiliki hak akses halaman ini",
            });
         }
      }
   );

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
         // const idFromToken = decodedToken.id;

         let dbData;
         const sql = "SELECT id, username, email, role, active FROM users";
         let connection;

         if (roleFromToken === "admin") {
            try {
               connection = await fastify.mysql.getConnection();
               const [rows] = await connection.query(sql, []);
               dbData = rows;
               connection.release();
               reply.send({
                  dbData,
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

   // register user
   fastify.post("/", async function (request, reply) {
      let pesan = "Sukses!";
      const { username, email } = request.body;
      const sql = "INSERT INTO users (username, code, email) values(?, ?, ?)";
      let connection;

      try {
         const code = uid();
         // send code to email;
         connection = await fastify.mysql.getConnection();
         await connection.query(sql, [username, code, email]);
         connection.release();
         reply.send({
            pesan,
         });
      } catch (error) {
         if (error.code === "ER_DUP_ENTRY") {
            reply.code(409).send({
               msg: "User already exsists!",
               error,
            });
         }
      }
   });

   fastify.patch(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const token = request.headers.authorization;
         let decodedToken = fastify.jwt.decode(token.replace("Bearer ", ""));
         let roleFromToken = decodedToken.role;
         let dbData;
         let connection;
         let data = request.body;

         const sql = "UPDATE users SET active = ?, role = ? WHERE id = ?";

         if (roleFromToken === "admin") {
            try {
               connection = await fastify.mysql.getConnection();
               const [rows] = await connection.query(sql, [
                  data.active,
                  data.role,
                  data.id,
               ]);
               dbData = rows;
               connection.release();
               reply.send({
                  data: dbData,
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

function sendEmail(code, email) {
   //prosedur kirim email
}

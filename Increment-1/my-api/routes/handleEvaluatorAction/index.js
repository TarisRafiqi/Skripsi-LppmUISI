"use strict";

const e404 = `Code 400\nServer tidak dapat atau tidak akan memproses permintaan karena sesuatu yang dianggap sebagai kesalahan klien (misalnya format sintaks permintaan salah, pembingkaian pesan permintaan tidak valid, atau perutean permintaan tipu-tipu)`;

const e500 = `The server has encountered a situation it does not know how to handle.`;

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
            "UPDATE proposal_ppm SET comment = ?, status = ?, random_penilaian_file_name = ? WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [
               data.comment,
               data.status,
               data.randomPenilaianFileName,
               data.id,
            ]);
            dbData = rows;
            connection.release();
            reply.send({
               dbData,
               statusCode: 200,
            });
         } catch (error) {
            reply.send({
               msg: "gagal terkoneksi ke db",
               error,
            });
         }
      }
   );

   fastify.patch(
      "/:pass",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let dbData;
         let connection;
         let data = request.body;

         const sql =
            "UPDATE proposal_ppm SET comment = ?, status = ? WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [
               data.comment,
               data.status,
               data.id,
            ]);
            dbData = rows;
            connection.release();
            reply.send({
               dbData,
               statusCode: 200,
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

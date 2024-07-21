"use strict";

const groupMap = {
   0: "dosen",
   9: "admin",
   10: "reviewer",
   11: "K.Departemen",
   12: "K.LPPM",
   13: "K.PusatKajian",
};

module.exports = async function (fastify, opts) {
   fastify.get(
      "/:role",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let dbData;
         let connection;
         const role = Number(request.params.role);
         const sql = "SELECT * FROM users WHERE role = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [role]);
            dbData = rows;
            connection.release();
            reply.send([...dbData]);
         } catch (error) {
            reply.send({
               msg: "gagal terkoneksi ke db",
            });
         }
      }
   );
};

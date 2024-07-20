"use strict";

module.exports = async function (fastify, opts) {
   fastify.post(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let data = request.body;
         let connection;

         const sql =
            "INSERT INTO pengumuman (judul, isi, active) values (?, ?, ?)";

         try {
            connection = await fastify.mysql.getConnection();
            await connection.query(sql, [
               data.judulPengumuman,
               data.isiPengumuman,
               data.activePengumuman,
            ]);
            connection.release();
            reply.send({
               msg: "Sukses Menambahkan Data",
            });
         } catch (error) {
            reply.send({
               msg: "gagal terkoneksi ke db",
               error,
            });
         }
      }
   );

   fastify.get(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let dbData;
         let connection;

         const sql = "SELECT * FROM pengumuman";

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
               error,
            });
         }
      }
   );
   fastify.get("/:public", async function (request, reply) {
      let dbData;
      let connection;

      const sql = "SELECT id, judul FROM pengumuman";

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
            error,
         });
      }
   });

   fastify.get("/:detail/:idP", async function (request, reply) {
      let dbData;
      let connection;
      const idP = Number(request.params.idP);

      // const sql = "SELECT * FROM pengumuman";
      const sql =
         "SELECT judul, isi, create_timestamp FROM pengumuman WHERE id = ?";

      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [idP]);
         dbData = rows[0];
         connection.release();
         reply.send({
            dbData,
         });
      } catch (error) {
         reply.send({
            error,
         });
      }
   });
   fastify.get(
      "/:detail/:admin/:idP",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         let dbData;
         let connection;
         const idP = Number(request.params.idP);

         const sql = "SELECT * FROM pengumuman WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [idP]);
            dbData = rows[0];
            connection.release();
            reply.send({
               dbData,
            });
         } catch (error) {
            reply.send({
               error,
            });
         }
      }
   );

   fastify.delete(
      "/:id",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const id = Number(request.params.id);
         let connection;

         const sql = "DELETE FROM pengumuman WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            await connection.query(sql, [id]);
            connection.release();
            reply.send({
               msg: "Sukses Menghapus Data",
            });
         } catch (error) {
            reply.send({
               error,
               msg: "gagal terkoneksi ke db",
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
         let data = request.body;
         let connection;
         let dbData;

         // reply.send({
         //    test: "Sukses ke API PATCH Pengumuman",
         //    data,
         // });
         // return;

         const sql =
            "UPDATE pengumuman SET judul = ?, isi = ?, active = ? WHERE id = ?";

         try {
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [
               data.judulPengumuman,
               data.isiPengumuman,
               data.activePengumuman,
               data.idPengumuman,
            ]);
            connection.release();
            reply.send({
               msg: "Sukses Mengubah Data Pengumuman",
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

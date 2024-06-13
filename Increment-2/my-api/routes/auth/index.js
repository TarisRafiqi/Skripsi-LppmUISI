"use strict";

const dev = process.env.DEV;

const groupMap = {
   0: "dosen",
   9: "admin",
   10: "reviewer",
   11: "Ka.Departemen",
   12: "Ka.LPPM",
   13: "Ka.PusatKajian",
};

const clientId =
   "6224320891-rv1khlf2774a4qrqdci4aju61nlvgdsa.apps.googleusercontent.com";
const clientSecret = "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";
// const redirectUrl = "http://localhost:3000/auth/google/callback";
const redirectUrl = dev
   ? "http://localhost:10443/auth/google/callback"
   : "https://lppmuisiapi.dififa.com/auth/google/callback";

const { google } = require("googleapis");
const oauth2Client = new google.auth.OAuth2(
   clientId,
   clientSecret,
   redirectUrl
);
const scopes = [
   "https://www.googleapis.com/auth/userinfo.email",
   "https://www.googleapis.com/auth/userinfo.profile",
];

module.exports = async function (fastify, opts) {
   fastify.get("/google", async function (request, reply) {
      const authorizationUrl = oauth2Client.generateAuthUrl({
         access_type: "offline",
         scope: scopes,
         include_granted_scopes: true,
      });
      reply.redirect(authorizationUrl);
      // reply.send({
      //    sukses: "sukses",
      // });
   });

   fastify.get("/google/callback", async function (request, reply) {
      //
      const { code } = request.query;
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      const oauth2 = google.oauth2({
         auth: oauth2Client,
         version: "v2",
      });

      const { data } = await oauth2.userinfo.get();

      let username = data.email;
      let role;
      let dbData;
      let connection;
      let id;

      const sql = "SELECT * FROM users WHERE username = ?";
      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [username]);
         dbData = rows[0] || false;
         connection.release();

         if (!dbData) {
            // jika tidak ada, daftarkan sebagai user baru kemudian kirimkan id, username, role dan token
            let aktif = 1;
            // Buat akun
            const sql =
               "INSERT INTO users (username, email, active) values(?, ?, ?)";
            connection = await fastify.mysql.getConnection();
            await connection.query(sql, [data.email, data.email, aktif]);

            // Ambil Data Akun
            const sql2 = "SELECT * FROM users WHERE username = ?";
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql2, [username]);
            dbData = rows[0];
            id = dbData.id;
            role = groupMap[rows[0].role];

            connection.release();

            console.log("Not found");
         } else {
            // jika ada, kirimkan id, username, role dan token
            const sql = "SELECT * FROM users WHERE username = ?";
            connection = await fastify.mysql.getConnection();
            const [rows] = await connection.query(sql, [username]);
            dbData = rows[0];
            connection.release();

            id = dbData.id;
            role = groupMap[rows[0].role];
         }
      } catch (error) {
         reply.send({
            msg: "gagal terkoneksi ke db",
            error,
         });
      }

      const token = fastify.jwt.sign({
         username,
         role,
         id,
         // type: "google"
      });

      reply.redirect(
         dev
            ? `http://localhost:3000/auth/home?token=${token}&id=${id}&role=${role}&username=${username}&tes=oke`
            : `https://lppmuisi.dififa.com/auth/home?token=${token}&id=${id}&role=${role}&username=${username}&tes=oke`
      );
   });

   fastify.post("/", async function (request, reply) {
      let { username, password } = request.body;
      const sql = `SELECT * from users WHERE username = ? AND password = ?`;
      let connection;
      let dbData;
      let token;
      let role;
      let id;
      let sukses = true;

      try {
         connection = await fastify.mysql.getConnection();
         const [rows] = await connection.query(sql, [username, password]);
         dbData = {
            ...rows[0],
            role: groupMap[rows[0].role],
         };
         connection.release();
      } catch (error) {
         reply.send({
            msg: "gagal terkoneksi ke db",
            error,
            sukses: false,
         });
      }

      // Membandingkan password yang dientry User dengan DB.
      if (password === dbData.password && username === dbData.username) {
         if (dbData.active) {
            token = fastify.jwt.sign({
               username,
               role: dbData.role,
               id: dbData.id,
            });
         } else {
            reply.send({
               msg: "Akun belum diaktifkan",
               sukses: false,
            });
         }
      } else {
         reply.send({
            msg: "Password tidak cocok",
            sukses: false,
         });
      }

      reply.send({
         id: dbData.id,
         username: dbData.username,
         role: dbData.role,
         token,
         sukses,
      });
   });
};

("use strict");

const fs = require("fs");
const path = require("path");

module.exports = async function (fastify, opts) {
   // Download File
   fastify.get(
      "/:randomPenilaianFileName",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const token = request.headers.authorization;
         const decodedToken = fastify.jwt.decode(token);

         const randomPenilaianFileName = request.params.randomPenilaianFileName;

         const filepath = path.join(
            __dirname,
            "../../upload_penilaian",
            randomPenilaianFileName + ".xlsx"
         );

         try {
            const buffer = fs.readFileSync(filepath);
            reply.code(200);
            reply.send(buffer);
         } catch (error) {
            reply.code(404).send({ error });
         }
      }
   );

   // Upload File
   fastify.post(
      "/",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const token = request.headers.authorization;
         const decodedToken = fastify.jwt.decode(token);

         const fileData = request.body.filePenilaian;
         const randomPenilaianFileName = request.body.randomPenilaianFileName;

         // reply.send({
         //    fileData,
         //    randomPenilaianFileName,
         //    msg: "<<<<<<",
         // });
         // return;

         const filepath =
            "./upload_penilaian/" + randomPenilaianFileName + ".xlsx";

         try {
            const buffer = Buffer.from(fileData.data, "base64");
            fs.writeFileSync(filepath, buffer);
            reply.code(200);
            reply.send({
               success: true,
               message: "File uploaded successfully",
            });
         } catch (error) {
            console.error("Error handling file upload:", error);
            reply
               .status(500)
               .send({ success: false, message: "Internal Server Error" });
         }
      }
   );
};

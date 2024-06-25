("use strict");

const fs = require("fs");
const path = require("path");

module.exports = async function (fastify, opts) {
   // Download File
   fastify.get(
      "/:randomPpmFileName",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         // const token = request.headers.authorization;
         // const decodedToken = fastify.jwt.decode(token);
         const randomPpmFileName = request.params.randomPpmFileName;

         const filepath = path.join(
            __dirname,
            "../../file_ppm",
            randomPpmFileName + ".pdf"
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
         // const token = request.headers.authorization;
         // const decodedToken = fastify.jwt.decode(token);
         const fileData = request.body.filePpm;
         const randomPpmFileName = request.body.randomPpmFileName;
         const filepath = "./file_ppm/" + randomPpmFileName + ".pdf";

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

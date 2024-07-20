("use strict");

const fs = require("fs");
const path = require("path");

module.exports = async function (fastify, opts) {
   // Download File
   fastify.get(
      "/:fileHasilPPMName",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const fileHasilPPMName = request.params.fileHasilPPMName;

         const filepath = path.join(
            __dirname,
            "../../file_hasilPPM",
            fileHasilPPMName + ".pdf"
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
         const fileData = request.body.fileHasilPPM;
         const fileHasilPPMName = request.body.fileHasilPPMName;
         const filepath = "./file_hasilPPM/" + fileHasilPPMName + ".pdf";

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

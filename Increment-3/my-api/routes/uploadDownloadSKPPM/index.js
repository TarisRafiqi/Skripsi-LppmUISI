("use strict");

const fs = require("fs");
const path = require("path");

module.exports = async function (fastify, opts) {
   // Download File
   fastify.get(
      "/:fileSkPPMName",
      {
         onRequest: [fastify.authenticate],
      },
      async function (request, reply) {
         const fileSkPPMName = request.params.fileSkPPMName;

         const filepath = path.join(
            __dirname,
            "../../file_SkPPM",
            fileSkPPMName + ".pdf"
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
         const fileData = request.body.fileSkPPM;
         const fileSkPPMName = request.body.fileSkPPMName;
         const filepath = "./file_SkPPM/" + fileSkPPMName + ".pdf";

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

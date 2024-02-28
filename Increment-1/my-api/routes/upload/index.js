("use strict");

const fs = require("fs");
const path = require("path");

module.exports = async function (fastify, opts) {
   // Download File
   fastify.get("/:randomRabFileName", async function (request, reply) {
      const token = request.headers.authorization;
      const decodedToken = fastify.jwt.decode(token);

      const randomRabFileName = request.params.randomRabFileName;

      const filepath = path.join(
         __dirname,
         "../../upload",
         randomRabFileName + ".xlsx"
      );

      try {
         const buffer = fs.readFileSync(filepath);
         reply.code(200);
         reply.send(buffer);
      } catch (error) {
         reply.code(404).send({ error });
      }
   });

   // Upload File
   fastify.post("/", async function (request, reply) {
      const token = request.headers.authorization;
      const decodedToken = fastify.jwt.decode(token);

      const fileData = request.body.file;
      const randomRabFileName = request.body.randomRabFileName;
      // reply.send({
      //    fileData,
      //    randomRabFileName,
      // });

      const filepath = "./upload/" + randomRabFileName + ".xlsx";

      try {
         const buffer = Buffer.from(fileData.data, "base64");
         fs.writeFileSync(filepath, buffer);
         reply.code(200);
         reply.send({ success: true, message: "File uploaded successfully" });
      } catch (error) {
         console.error("Error handling file upload:", error);
         reply
            .status(500)
            .send({ success: false, message: "Internal Server Error" });
      }
   });
};

const removeGallery = require("../../../utils/beverage/s3-interactions/removeGallery");

module.exports = async function (fastify, opts) {
  fastify.delete("/gallery", async function (req, reply) {
    const files = req.body.files;
    const path = req.body.path;

    await removeGallery(path, files);

    reply.send({ done: true });
  });
};

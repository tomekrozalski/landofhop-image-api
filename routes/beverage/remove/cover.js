const removeCover = require("../../../utils/beverage/s3-interactions/removeCover");

module.exports = async function (fastify, opts) {
  fastify.delete("/cover", async function (req, reply) {
    const path = req.body.path;

    await removeCover(path);

    reply.send({ done: true });
  });
};

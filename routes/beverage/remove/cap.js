const removeCap = require("../../../utils/beverage/s3-interactions/removeCap");

module.exports = async function (fastify, opts) {
  fastify.delete("/cap", async function (req, reply) {
    const path = req.body.path;

    await removeCap(path);

    reply.send({ done: true });
  });
};

const {
  saveCapJpg,
  saveCapWebp,
} = require("../../utils/beverage/s3-interactions/saveCap");

module.exports = async function (fastify, opts) {
  fastify.post("/add-cap", async function (req, reply) {
    const data = await req.file();
    const image = await data.toBuffer();
    const path = req.headers.path;
    const coverPath = `${path}/cap`;

    try {
      await Promise.all([
        saveCapWebp(coverPath, image, "large"),
        saveCapWebp(coverPath, image, "big"),
        saveCapWebp(coverPath, image, "small"),
        saveCapJpg(coverPath, image, "large"),
        saveCapJpg(coverPath, image, "big"),
        saveCapJpg(coverPath, image, "small"),
      ]);

      reply.send({ capSaved: true });
    } catch (err) {
      console.error(err);
    }
  });
};

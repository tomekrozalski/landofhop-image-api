const sizeOf = require("buffer-image-size");
const {
  saveCoverJpg,
  saveCoverWebp,
} = require("../../utils/beverage/s3-interactions/saveCover");
const getTracedSVG = require("../../utils/beverage/s3-interactions/getTracedSvg");

module.exports = async function (fastify, opts) {
  fastify.post("/add-cover", async function (req, reply) {
    const data = await req.file();
    const image = await data.toBuffer();
    const path = req.headers.path;
    const coverPath = `${path}/cover`;

    try {
      await Promise.all([
        saveCoverWebp(coverPath, image, "large"),
        saveCoverWebp(coverPath, image, "big"),
        saveCoverWebp(coverPath, image, "small"),
        saveCoverJpg(coverPath, image, "large"),
        saveCoverJpg(coverPath, image, "big"),
        saveCoverJpg(coverPath, image, "small"),
      ]);

      const outlines = await getTracedSVG(image);
      const { height, width } = sizeOf(image);

      reply.send({ height, outlines, width });
    } catch (err) {
      console.error(err);
    }
  });
};

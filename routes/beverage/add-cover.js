const sizeOf = require("buffer-image-size");
const saveCover = require("../../utils/beverage/s3-interactions/saveCover");

module.exports = async function (fastify, opts) {
  fastify.post("/add-cover", async function (req, reply) {
    const data = await req.file();
    const image = await data.toBuffer();
    const { badge, brand, shortId } = data.fields;
    const coverPath = `${brand.value}/${badge.value}/${shortId.value}/cover`;

    try {
      await Promise.all([
        saveCover({
          coverPath,
          format: "webp",
          image,
          size: "large",
        }),
        saveCover({
          coverPath,
          format: "webp",
          image,
          size: "big",
        }),
        saveCover({
          coverPath,
          format: "webp",
          image,
          size: "small",
        }),
        saveCover({
          coverPath,
          format: "jpg",
          image,
          size: "large",
        }),
        saveCover({
          coverPath,
          format: "jpg",
          image,
          size: "big",
        }),
        saveCover({
          coverPath,
          format: "jpg",
          image,
          size: "small",
        }),
      ]);

      const { height, width } = sizeOf(image);
      reply.send({ height, width });
    } catch (err) {
      console.error(err);
    }
  });
};

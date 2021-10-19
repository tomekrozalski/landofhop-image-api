const {
  saveGalleryJpg,
  saveGalleryWebp,
} = require("../../utils/beverage/s3-interactions/saveGallery");
const getTracedSVG = require("../../utils/beverage/s3-interactions/getTracedSVG");
const removeGallery = require("../../utils/beverage/s3-interactions/removeGallery");

module.exports = async function (fastify, opts) {
  fastify.post("/add-gallery", async function (req, reply) {
    const parts = req.files();
    const path = req.headers.path;
    const removeCount = +req.headers.removecount;
    const galleryPath = `${path}/container`;

    let outlines;
    let index = 1;

    if (removeCount) {
      await removeGallery(path, removeCount);
    }

    try {
      const operations = [];

      for await (const part of parts) {
        const image = await part.toBuffer();
        const fileName = index.toString().padStart(2, "0");

        if (index === 1) {
          outlines = await getTracedSVG(image);
        }

        const imageSet = [
          saveGalleryJpg(galleryPath, image, "large", fileName),
          saveGalleryJpg(galleryPath, image, "big", fileName),
          saveGalleryJpg(galleryPath, image, "small", fileName),
          saveGalleryWebp(galleryPath, image, "large", fileName),
          saveGalleryWebp(galleryPath, image, "big", fileName),
          saveGalleryWebp(galleryPath, image, "small", fileName),
        ];

        operations.push(...imageSet);
        index = index + 1;
      }

      await Promise.all(operations);
      reply.send({ outlines });
    } catch (err) {
      console.error(err);
    }
  });
};

const sharp = require("sharp");
const potrace = require("potrace");
const { optimize } = require("svgo");
require("isomorphic-unfetch");

module.exports = async function getTracedSVG(image) {
  return new Promise((resolve, reject) => {
    sharp(image)
      .resize(220)
      .toBuffer()
      .then((preparedImage) => {
        potrace.trace(
          preparedImage,
          {
            color: "#ddd",
            threshold: 200,
            optTolerance: 0.4,
            turdSize: 100,
            turnPolicy: potrace.Potrace.TURNPOLICY_MAJORITY,
          },
          (err, svg) => {
            if (err) {
              reject();
            }

            const result = optimize(svg, {
              multipass: true,
              plugins: [
                {
                  name: "removeViewBox",
                  params: {
                    overrides: {
                      convertPathData: false,
                    },
                  },
                },
                {
                  name: "convertPathData",
                  params: {
                    floatPrecision: 0,
                    noSpaceAfterFlags: true,
                  },
                },
                "removeDimensions",
                "removeUnknownsAndDefaults",
              ],
            });

            resolve(result.data);
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

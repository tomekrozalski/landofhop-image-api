const aws = require("aws-sdk");
const sharp = require("sharp");

const { getSize, getWidth } = require("../getSize");

const s3 = new aws.S3({});

module.exports = function saveCover({ coverPath, format, image, size }) {
  return new Promise((resolve, reject) => {
    console.log({ format });

    if (format === "jpg") {
      sharp(image)
        .jpeg({})
        .resize(getWidth(size))
        .toBuffer()
        .then((data) =>
          s3.upload(
            {
              Bucket: "land-of-hop-images",
              Key: `${coverPath}/jpg/${getSize(size)}.jpg`,
              Body: data,
              ACL: "public-read",
            },
            (errors, data) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(data);
              }
            }
          )
        );
    }

    if (format === "webp") {
      sharp(image)
        .webp({})
        .resize(getWidth(size))
        .toBuffer()
        .then((data) =>
          s3.upload(
            {
              Bucket: "land-of-hop-images",
              Key: `${coverPath}/webp/${getSize(size)}.webp`,
              Body: data,
              ACL: "public-read",
            },
            (errors, data) => {
              if (errors) {
                reject(errors);
              } else {
                resolve(data);
              }
            }
          )
        );
    }
  });
};

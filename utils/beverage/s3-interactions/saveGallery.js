const aws = require("aws-sdk");
const sharp = require("sharp");

const { getSize, getWidth } = require("../getSize");

const s3 = new aws.S3({});

function saveGalleryJpg(containerPath, image, size, fileName) {
  return new Promise((resolve, reject) => {
    sharp(image)
      .jpeg({})
      .resize(getWidth(size))
      .toBuffer()
      .then((data) =>
        s3.upload(
          {
            Bucket: "land-of-hop-images",
            Key: `${containerPath}/jpg/${getSize(size)}/${fileName}.jpg`,
            Body: data,
            CacheControl: "max-age=31536000",
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
  });
}

function saveGalleryWebp(containerPath, image, size, fileName) {
  return new Promise((resolve, reject) => {
    sharp(image)
      .webp({})
      .resize(getWidth(size))
      .toBuffer()
      .then((data) =>
        s3.upload(
          {
            Bucket: "land-of-hop-images",
            Key: `${containerPath}/webp/${getSize(size)}/${fileName}.webp`,
            Body: data,
            CacheControl: "max-age=31536000",
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
  });
}

module.exports = {
  saveGalleryJpg,
  saveGalleryWebp,
};

const aws = require("aws-sdk");
const sharp = require("sharp");

const { getSize, getWidth } = require("../getSize");

const s3 = new aws.S3({});

function saveCapJpg(capPath, image, size) {
  return new Promise((resolve, reject) => {
    sharp(image)
      .jpeg({})
      .resize({ width: getWidth(size), height: getWidth(size) })
      .toBuffer()
      .then((data) =>
        s3.upload(
          {
            Bucket: "land-of-hop-images",
            Key: `${capPath}/jpg/${getSize(size)}.jpg`,
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

function saveCapWebp(capPath, image, size) {
  return new Promise((resolve, reject) => {
    sharp(image)
      .webp({})
      .resize({ width: getWidth(size), height: getWidth(size) })
      .toBuffer()
      .then((data) =>
        s3.upload(
          {
            Bucket: "land-of-hop-images",
            Key: `${capPath}/webp/${getSize(size)}.webp`,
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
  saveCapJpg,
  saveCapWebp,
};

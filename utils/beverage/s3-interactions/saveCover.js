const aws = require("aws-sdk");
const sharp = require("sharp");

const { getSize, getWidth } = require("../getSize");

const s3 = new aws.S3({});

function saveCoverJpg(coverPath, image, size) {
  return new Promise((resolve, reject) => {
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

function saveCoverWebp(coverPath, image, size) {
  return new Promise((resolve, reject) => {
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
  saveCoverJpg,
  saveCoverWebp,
};

// import { FastifyPluginAsync } from 'fastify';

// import { saveCover } from '@/utils/s3-interactions/saveCover';

// const fs = require("fs");
// const util = require("util");
// const { pipeline } = require("stream");
// const pump = util.promisify(pipeline);

module.exports = async function (fastify, opts) {
  fastify.post("/add-cover", async function (req, reply) {
    // process a single file
    // also, consider that if you allow to upload multiple files
    // you must consume all files otherwise the promise will never fulfill
    const data = await req.file();
    const image = await data.toBuffer();

    console.log("1", image);
    console.log("2", data.fields);

    // console.log('body', body);

    //     const data = await request.file();
    //     const image = await data.toBuffer();
    //
    //     console.log('body', request.body);
    //
    //     const parts = request.parts();
    //     console.log('yy', parts);
    //     console.log('xx', image);
    //
    //     for await (const part of parts) {
    //       if (part.file) {
    //         console.log('file');
    //       } else {
    //         console.log('part', part);
    //       }
    //     }

    //     const coverPath = `brand/badge/shortId/cover`;
    //
    //     const b: any = await saveCover({
    //       coverPath,
    //       format: 'webp',
    //       image,
    //       size: 'large',
    //     });
    //
    //     console.log({ b });

    reply.send({ response: "ha" });
  });
};

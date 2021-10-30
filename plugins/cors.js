"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-cors"), {
    origin: process.env.ALLOWED_ORIGIN,
  });
});

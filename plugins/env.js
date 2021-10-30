"use strict";

const fp = require("fastify-plugin");

const schema = {
  type: "object",
  required: ["ALLOWED_ORIGIN"],
  properties: {
    PORT: {
      type: "string",
      default: "http://localhost:8000",
    },
  },
};

const o = {
  schema,
};

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-env"), o);
});

const countries = require("i18n-iso-countries");

module.exports = async function (fastify, opts) {
  fastify.get("/countries/:lang", async function (req, reply) {
    const { lang } = req.params;

    switch (lang) {
      case "pl":
        countries.registerLocale(require("i18n-iso-countries/langs/pl.json"));
        return reply.send(countries.getNames("pl", { select: "official" }));
      case "en":
      default:
        countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
        return reply.send(countries.getNames("en", { select: "official" }));
    }
  });
};

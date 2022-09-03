module.exports = {
  load: {
    before: ["responseTime", "logger", "cors", "responses", "gzip"],
    order: ["cookieparser", "cookieauth"],
    after: ["parser", "router"],
  },
  settings: {
    cookieparser: {
      enabled: true,
    },
    cookieauth: {
      enabled: true,
    },
  },
};

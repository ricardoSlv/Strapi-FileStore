const cookie = require('koa-cookie');

module.exports = strapi => {
  return {
    // can also be async
    initialize() {
      strapi.app.use(cookie.default());
    },
  };
};

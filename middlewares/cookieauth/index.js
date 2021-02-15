module.exports = strapi => {
  return {
    // can also be async
    initialize() {
      strapi.app.use(async (ctx, next) => {
        // await someAsyncCode()
        //console.log(ctx.request.header)
        //console.log(ctx.cookie.JWT);
        // console.log(ctx.state)
        ctx.request.header.authorization=`Bearer ${ctx.cookie.JWT}`
        //console.log("ola",ctx.request.header.authorization)
        //console.log(ctx.request)

        await next();

        // await someAsyncCode()
      });
    },
  };
};

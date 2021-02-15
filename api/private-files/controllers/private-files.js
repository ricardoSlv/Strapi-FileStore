'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const fs = require('fs');
const fsP = fs.promises
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.Url = files.file.name;
      data.Type = files.file.type;

      entity = await strapi.services['private-files'].create(data);
      // console.log('Entity ', Object.keys(entity).join(' '))
      // console.log('Type ', files.file.type)

      await fsP.mkdir(`./files/${entity.id}`)
      await fsP.rename(files.file.path, `./files/${entity.id}/${files.file.name}`)

    } else {
      entity = await strapi.services['private-files'].create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models['private-files'] });
  },

  async download(ctx) {
    // console.log('Ctx ', Object.keys(ctx).join(' '))
    // console.log('Params ', Object.keys(ctx.params).join(' '))
    // console.log('Res ', Object.keys(ctx.res).join(' '))
    // console.log('State', Object.keys(ctx.state).join(' '))

    const entity = await strapi.services['private-files'].findOne({id: ctx.params.id})
    const path = `./files/${entity.id}/${entity.Url}`
    // console.log(entity)

    //const file = await fsP.readFile('./files/14/avatar.png')
    //var stat = await fsP.stat('./files/14/avatar.png');
    //ctx.type='image/png';
    //ctx.set('Content-Length',stat.size*2);

    //ctx.attachment('./files/14/avatar.png')

    ctx.body = fs.createReadStream(path);

    ctx.set('Content-disposition', `attachment; filename=${path}`);
    ctx.set('Content-type', entity.Type);
  }
};

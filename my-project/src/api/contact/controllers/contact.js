'use strict';

/**
 * contact controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact.contact', ({ strapi }) => ({
  async delete(ctx){
    const {id} = ctx.params;
    const {id: authId} = ctx.state.user
    const contact = await strapi.entityService.findOne(
      'api::contact.contact',
      +id,
      {
        populate : 'author'
      }
    );
    if(!contact) return ctx.notFound('Contact is not Found to be Deleted')
    if(contact.author.id !== authId ) return ctx.unauthorized('You are not the owner of this contact')

    const response = await super.delete(ctx)
    return response;

  },

async create(ctx){
  const {id} = ctx.state.user;
  ctx.request.body.data.author = id;
  const response = await super.create(ctx)
  return response;
},

async update(ctx){
  const {id: authId} = ctx.state.user
  const {id} = ctx.params;
    const contact = await strapi.entityService.findOne(
      'api::contact.contact',
      +id,
      {
        populate : 'author'
      }
    );
    if(!contact) return ctx.notFound('Contact is not Found to be Updated')
    if(contact.author.id !== authId ) return ctx.unauthorized('You are not the owner of this contact to update')

    const response = await super.update(ctx)
    return response;
}

}))

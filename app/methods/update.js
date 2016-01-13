'use strict'
const joi = require('joi')

module.exports = function(ms, opts, next) {
  let Client = ms.plugins.models.Client

  ms.method({
    name: 'update',
    config: {
      validate: {
        id: joi.string().required(),
        security: joi.object().keys({
          allow: joi.object().keys({
            userId: joi.string(),
          }),
        }).required(),
      },
    },
    handler(params) {
      return Client.findOne({
          _id: params.id,
        })
        .exec()
        .then(client => {
          if (!client) return Promise.reject(new Error('clientNotFound'))

          if (params.security.allow && params.security.allow.userId &&
            client.userId !== params.security.allow.userId) {
            return Promise.reject(new Error('You cannot edit a client that was not created by you!'))
          }

          if (typeof params.name !== 'undefined')
            client.name = params.name

          if (typeof params.description !== 'undefined')
            client.description = params.description

          if (typeof params.homepageUrl !== 'undefined')
            client.homepageUrl = params.homepageUrl

          if (typeof params.authCallbackUrl !== 'undefined')
            client.authCallbackUrl = params.authCallbackUrl

          if (typeof params.trusted !== 'undefined')
            client.trusted = params.trusted

          if (typeof params.publicId !== 'undefined')
            client.publicId = params.publicId

          if (typeof params.secret !== 'undefined')
            client.secret = params.secret

          return client.save()
        })
    },
  })

  next()
}

module.exports.attributes = {
  name: 'update',
}

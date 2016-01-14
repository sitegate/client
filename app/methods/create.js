'use strict'
const joi = require('joi')
const uid = require('rand-token').uid

module.exports = function(ms, opts, next) {
  let Client = ms.plugins.models.Client;

  ms.method({
    name: 'create',
    config: {
      validate: {
        name: joi.string().required(),
        userId: joi.string().required(),
        homepageUrl: joi.string().required(),
        authCallbackUrl: joi.string().required(),
      },
    },
    handler(params) {
      let client = new Client(params)

      client.publicId = params.publicId || uid(20)
      client.secret = params.secret || uid(40)

      return client.save()
    },
  })

  next()
}

module.exports.attributes = {
  name: 'create',
}

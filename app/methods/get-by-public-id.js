'use strict'
const joi = require('joi')

module.exports = function(ms, opts, next) {
  let Client = ms.plugins.models.Client;

  ms.method({
    name: 'getByPublicId',
    config: {
      validate: {
        publicId: joi.string().required(),
      },
    },
    handler(params, cb) {
      Client.findOne({ publicId: params.publicId }, cb)
    },
  })

  next()
}

module.exports.attributes = {
  name: 'get-by-public-id',
}

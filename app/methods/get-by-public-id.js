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
    handler(params) {
      return Client.findOne({ publicId: params.publicId }).exec()
    },
  })

  next()
}

module.exports.attributes = {
  name: 'get-by-public-id',
}

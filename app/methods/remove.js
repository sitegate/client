'use strict'
const joi = require('joi')

module.exports = function(ms, opts, next) {
  let Client = ms.plugins.models.Client

  ms.method({
    name: 'remove',
    config: {
      validate: {
        id: joi.string().required(),
      },
    },
    handler(params) {
      return Client.findByIdAndRemove(params.id)
    },
  })

  next()
}

module.exports.attributes = {
  name: 'remove',
}

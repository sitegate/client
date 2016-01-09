'use strict'
const joi = require('joi')

module.exports = function(ms, opts, next) {
  let Client = ms.plugins.models.Client;

  ms.method({
    name: 'remove',
    config: {
      validate: {
        id: joi.string().required(),
      },
    },
    handler(params, cb) {
      Client.findByIdAndRemove(params.id, cb)
    },
  })

  next()
}

module.exports.attributes = {
  name: 'remove',
}

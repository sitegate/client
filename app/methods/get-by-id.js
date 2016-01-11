'use strict'
const joi = require('joi')

module.exports = function(ms, opts, next) {
  let Client = ms.plugins.models.Client

  ms.method({
    name: 'getById',
    config: {
      validate: {
        id: joi.string().required(),
      },
    },
    handler(params, cb) {
      params.fields = params.fields || [];

      Client.findById(params.id, params.fields.join(' '), cb);
    },
  })

  next()
}

module.exports.attributes = {
  name: 'get-by-id',
}

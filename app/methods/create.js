'use strict'
const uid = require('rand-token').uid

module.exports = function(ms, opts, next) {
  let Client = ms.plugins.models.Client;

  ms.method({
    name: 'create',
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

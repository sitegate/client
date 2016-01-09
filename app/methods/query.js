'use strict'
module.exports = function(ms, opts, next) {
  let Client = ms.plugins.models.Client

  ms.method({
    name: 'query',
    handler(params, cb) {
      params.fields = params.fields || []

      params.count = params.count || 100

      let query = {}
      if (params.creatorId) {
        query.userId = params.creatorId
      }
      if (params.ids) {
        query._id = {
          $in: params.ids,
        }
      }

      Client
        .find(query, params.fields.join(' '))
        .limit(params.count)
        .exec(cb)
    },
  })

  next()
}

module.exports.attributes = {
  name: 'query',
}

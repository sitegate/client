'use strict'
module.exports = function(ms, opts, next) {
  let Client = ms.plugins.models.Client

  ms.method({
    name: 'query',
    handler(params) {
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

      return Client
        .find(query, params.fields.join(' '))
        .limit(params.count)
        .exec()
    },
  })

  next()
}

module.exports.attributes = {
  name: 'query',
}

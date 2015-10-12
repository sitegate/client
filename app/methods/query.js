'use strict';

module.exports = function(ms) {
  var Client = ms.models.Client;

  return function(params, cb) {
    params = params || {};
    params.fields = params.fields || [];

    params.count = params.count || 100;

    var query = {};
    if (params.creatorId) {
      query.userId = params.creatorId;
    }
    if (params.ids) {
      query._id = {
        $in: params.ids
      };
    }

    Client
      .find(query, params.fields.join(' '))
      .limit(params.count)
      .exec(cb);
  };
};

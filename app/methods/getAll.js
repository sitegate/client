'use strict';

var Client = require('../../models/client');

module.exports = function (params, cb) {
  params = params || {};
  params.fields = params.fields || [];

  if (!params.count) {
    return cb(new Error('count is missing'));
  }
  
  var query = {};
  if (params.creatorId) {
    query.userId = params.creatorId;
  }

  Client
    .find(query, params.fields.join(' '))
    .limit(params.count)
    .exec(cb);
};
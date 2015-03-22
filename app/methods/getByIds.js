'use strict';

var Client = require('../../models/client');

module.exports = function (params, cb) {
  Client.find({
    _id: {
      $in: params.clientIds
    }
  }, cb);
};
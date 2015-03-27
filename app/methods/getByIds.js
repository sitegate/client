'use strict';

var Client = require('../../models/client');

module.exports = function (clientIds, cb) {
  Client.find({
    _id: {
      $in: clientIds
    }
  }, cb);
};
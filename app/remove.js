'use strict';

var Client = require('../models/client');

module.exports = function (params, cb) {
  Client.findByIdAndRemove(params.clientId, cb);
};
'use strict';

var Client = require('../models/client');

module.exports = function (params, cb) {
  params = params || {};
  
  if (!params.id) {
    return cb(new Error('id is missing'));
  }
  
  Client.findById(params.id, cb);
};
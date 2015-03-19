'use strict';

var Client = require('../models/client');

module.exports = function (params, cb) {
  params = params || {};
  
  if (!params.publicId) {
    return cb(new Error('publicId is missing'));
  }
    
  Client.findOne({ publicId: params.publicId }, cb);
};
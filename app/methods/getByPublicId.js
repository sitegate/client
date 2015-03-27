'use strict';

var Client = require('../../models/client');

module.exports = function (publicId, cb) {
  if (!publicId) {
    return cb(new Error('publicId is missing'));
  }
  
  Client.findOne({ publicId: publicId }, cb);
};
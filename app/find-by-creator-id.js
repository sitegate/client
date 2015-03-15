'use strict';

var Client = require('../models/client');

module.exports = function (params, cb) {
  params = params || {};
    
  if (!params.userId) {
    return cb('userId is missing');
  }
  
  Client.find({
    userId: params.userId
  }, function (err, clients) {
    if (err) {
      return cb(err);
    }

    return cb(null, clients);
  });
};
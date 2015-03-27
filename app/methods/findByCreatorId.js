'use strict';

var Client = require('../../models/client');

module.exports = function (userId, cb) {
  if (!userId) {
    return cb('userId is missing');
  }

  Client.find({
    userId: userId
  }, function (err, clients) {
    if (err) {
      return cb(err);
    }

    return cb(null, clients);
  });
};
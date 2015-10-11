'use strict';

module.exports = function(ms) {
  var Client = ms.models.Client;

  return function(publicId, cb) {
    if (!publicId) {
      return cb(new Error('publicId is missing'));
    }

    Client.findOne({ publicId: publicId }, cb);
  };
};

'use strict';

module.exports = function(ms) {
  var Client = ms.models.Client;

  return function(id, cb) {
    Client.findByIdAndRemove(id, cb);
  };
};

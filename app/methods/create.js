'use strict';

var uid = require('rand-token').uid;

module.exports = function(ms) {
  var Client = ms.models.Client;

  return function(params, cb) {
    var client = new Client(params);

    client.publicId = params.publicId || uid(20);
    client.secret = params.secret || uid(40);

    client.save(cb);
  };
};

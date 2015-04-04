'use strict';

var uid = require('rand-token').uid;
var Client = require('../../models/client');

module.exports = function (params, cb) {
  var client = new Client(params);

  client.publicId = params.publicId || uid(20);
  client.secret = params.secret || uid(40);
  
  client.save(cb);
};
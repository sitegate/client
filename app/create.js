'use strict';

var uid = require('./helpers/uid');
var Client = require('../models/client');

module.exports = function (params, cb) {
  var client = new Client(params);

  client.publicId = uid(20);
  client.secret = uid(40);
  
  client.save(cb);
};
'use strict';

var Client = require('../models/client');

module.exports = function (params, cb) {
  params = params || {};
    
  Client.findOne({
    _id: params.clientId
  }, function (err, client) {
    if (err) {
      return cb(err);
    }

    if (client.userId !== params.userId) {
      return cb(new Error('You cannot edit a client that was not created by you!'));
    }

    client.name = params.name;
    client.description = params.description;
    client.homepageUrl = params.homepageUrl;
    client.authCallbackUrl = params.authCallbackUrl;

    client.save(cb);
  });
};
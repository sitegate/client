'use strict';

var Client = require('../../models/client');
var ServerError = require('bograch').ServerError;

module.exports = function update() {
  var id = arguments[0];
  var params = arguments[1];
  var security, cb;
  if (typeof arguments[2] === 'function') {
    security = {};
    cb = arguments[2];
  } else {
    security = arguments[2];
    cb = arguments[3];
  }
  
  Client.findOne({
    _id: id
  }, function (err, client) {
    if (err) {
      return cb(err);
    }
    
    if (!client) {
      return cb(new ServerError('clientNotFound'));
    }

    if (security.allow && security.allow.userId &&
        client.userId !== security.allow.userId) {
      return cb(new ServerError('notAllowed', 'You cannot edit a client that was not created by you!'));
    }

    if (typeof params.name !== 'undefined') {
      client.name = params.name;
    }
    if (typeof params.description !== 'undefined') {
      client.description = params.description;
    }
    if (typeof params.homepageUrl !== 'undefined') {
      client.homepageUrl = params.homepageUrl;
    }
    if (typeof params.authCallbackUrl !== 'undefined') {
      client.authCallbackUrl = params.authCallbackUrl;
    }

    client.save(cb);
  });
};
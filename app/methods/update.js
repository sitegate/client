'use strict';

var Client = require('../../models/client');
var ServerError = require('bograch').ServerError;
var dfun = require('dfun');

module.exports = dfun(String, Object, [Object, {}], Function,
  function (id, params, security, cb) {
    params = params || {};
  
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
        return cb(new ServerError('notAllowed',
          'You cannot edit a client that was not created by you!'));
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
  });
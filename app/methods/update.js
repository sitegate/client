'use strict';

var dfun = require('dfun');

module.exports = function(ms) {
  var Client = ms.models.Client;

  return dfun(String, Object, [Object, {}], Function,
    function(id, params, security, cb) {
      params = params || {};

      Client.findOne({
        _id: id
      }, function(err, client) {
        if (err) {
          return cb(err);
        }

        if (!client) {
          return cb(new Error('clientNotFound'));
        }

        if (security.allow && security.allow.userId &&
          client.userId !== security.allow.userId) {
          return cb(new Error('You cannot edit a client that was not created by you!'));
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
        if (typeof params.trusted !== 'undefined') {
          client.trusted = params.trusted;
        }
        if (typeof params.publicId !== 'undefined') {
          client.publicId = params.publicId;
        }
        if (typeof params.secret !== 'undefined') {
          client.secret = params.secret;
        }

        client.save(cb);
      });
    });
};

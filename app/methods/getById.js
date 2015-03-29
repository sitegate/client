'use strict';

var Client = require('../../models/client');
var dfun = require('dfun');

module.exports = dfun(String, [Object, {}], Function,
  function (id, options, cb) {
    options.fields = options.fields || [];

    Client.findById(id, options.fields.join(' '), cb);
  });
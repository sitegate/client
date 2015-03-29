'use strict';

var Client = require('../../models/client');

module.exports = function () {
  var id = arguments[0];
  var options, cb;
  if (typeof arguments[1] === 'function') {
    cb = arguments[1];
  } else {
    options = arguments[1];
    cb = arguments[2];
  }

  options = options || {};
  options.fields = options.fields || [];

  Client.findById(id, options.fields.join(' '), cb);
};
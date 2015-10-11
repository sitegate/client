'use strict';

var dfun = require('dfun');

module.exports = function(ms) {
  var Client = ms.models.Client;

  return dfun(String, [Object, {}], Function,
    function(id, options, cb) {
      options.fields = options.fields || [];

      Client.findById(id, options.fields.join(' '), cb);
    });
};

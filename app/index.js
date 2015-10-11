'use strict';

var methodNames = require('./method-names');

module.exports = function(opts) {
  opts = opts || {};

  if (!opts.models) {
    throw new Error('`opts.models` is required');
  }
  if (!opts.models.Client) {
    throw new Error('`opts.models.Client` is required');
  }

  var ms = {
    models: opts.models,
    methods: {}
  };
  methodNames.forEach(function(methodName) {
    var methodFactory = require('./methods/' + methodName);
    ms.methods[methodName.replace('.js', '')] = methodFactory(ms);
  });
  return ms.methods;
};

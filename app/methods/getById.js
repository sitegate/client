'use strict';

var Client = require('../../models/client');

module.exports = function (id, cb) {
  Client.findOne({ _id: id }, cb);
};
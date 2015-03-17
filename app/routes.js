'use strict';

var findByCreatorId = require('./find-by-creator-id');
var create = require('./create');
var getById = require('./get-by-id');
var update = require('./update');
var remove = require('./remove');
var getByIds = require('./get-by-ids');

module.exports = function (server) {
  server.addMethods({
    findByCreatorId: findByCreatorId,
    create: create,
    getById: getById,
    update: update,
    remove: remove,
    getByIds: getByIds
  });
};
'use strict';

var findByCreatorId = require('./find-by-creator-id');
var create = require('./create');
var getById = require('./get-by-id');
var getByPublicId = require('./get-by-public-id');
var update = require('./update');
var remove = require('./remove');
var getByIds = require('./get-by-ids');

module.exports = function (server) {
  server.addMethods({
    findByCreatorId: findByCreatorId,
    create: create,
    getById: getById,
    getByPublicId: getByPublicId,
    update: update,
    remove: remove,
    getByIds: getByIds
  });
};
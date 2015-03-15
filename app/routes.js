'use strict';

var findByCreatorId = require('./find-by-creator-id');
var create = require('./create');
var getById = require('./get-by-id');
var update = require('./update');
var remove = require('./remove');
var getByIds = require('./get-by-ids');

module.exports = function (worker) {
  worker.on('client.findByCreatorId', findByCreatorId);
  
  worker.on('client.create', create);
  
  worker.on('client.getById', getById);
  
  worker.on('client.update', update);
  
  worker.on('client.remove', remove);
  
  worker.on('client.getByIds', getByIds);
};
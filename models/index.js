'use strict';

var mongoose = require('mongoose');

module.exports = function(mongoURI) {
  var connection = mongoose.createConnection(mongoURI);

  connection.on('connected', function() {
    console.log('Mongoose connected in Client microservice');
  });

  var models = {
    Client: require('./client')(connection)
  };

  return models;
};

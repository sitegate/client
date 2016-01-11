'use strict'
const config = require('./config')
const Server = require('jimbo').Server

let server = new Server()

server.connection({
  channel: 'sitegate-client',
  url: config.get('amqpURI'),
})

server
  .register([
    {
      register: require('./models'),
      options: {
        mongoURI: config.get('mongodbURI'),
      },
    },
    {
      register: require('./app/methods/create'),
    },
    {
      register: require('./app/methods/get-by-id'),
    },
    {
      register: require('./app/methods/get-by-public-id'),
    },
    {
      register: require('./app/methods/query'),
    },
    {
      register: require('./app/methods/remove'),
    },
    {
      register: require('./app/methods/update'),
    },
  ])
  .then(() => server.start())
  .then(() => console.log('client server started'))
  .catch(err => {throw err})

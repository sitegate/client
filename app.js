'use strict'
const Server = require('jimbo').Server

let server = new Server()

server.connection({
  channel: 'sitegate-client',
  url: 'amqp://guest:guest@localhost:5672',
})

server
  .register([
    {
      register: require('./models'),
      options: {
        mongoURI: 'mongodb://localhost:27017/sitegate-user',
      },
    },
    {
      register: require('./app/methods/create'),
    },
    {
      register: require('./app/methods/getById'),
    },
    {
      register: require('./app/methods/getByPublicId'),
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

'use strict'
const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
const expect = chai.expect
const jimbo = require('jimbo')
const create = require('../../app/methods/create')
const modelsPlugin = require('../../models')
const MONGO_URI = 'mongodb://localhost/sitegate-client-tests'
const clearDB = require('mocha-mongoose')(MONGO_URI)

chai.use(chaiAsPromised)

describe('create', function() {
  let server

  beforeEach(clearDB)
  beforeEach(function() {
    server = jimbo()

    return server.register([
      {
        register: modelsPlugin,
        options: {
          mongoURI: MONGO_URI,
        },
      },
    ])
  })

  it('should register client', function() {
    return server
      .register([
        {
          register: create,
        },
      ])
      .then(() => server.methods.create({
          name: 'foo',
          description: 'foo bar qar qaz',
          userId: '507f191e810c19729de860ea',
          homepageUrl: 'http://foo.com',
          authCallbackUrl: 'http://foo.com/auth/callback',
        }))
      .then(client => {
        expect(client).to.exist
        expect(client.id).to.exist
      })
  })
})

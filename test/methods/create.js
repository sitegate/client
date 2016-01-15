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
  beforeEach(clearDB)
  beforeEach(function(next) {
    this._server = new jimbo.Server()

    this._server.register([
      {
        register: modelsPlugin,
        options: {
          mongoURI: MONGO_URI,
        },
      },
    ], err => next(err))
  })

  it('should register client', function() {
    return this._server
      .register([
        {
          register: create,
        },
      ])
      .then(() => this._server.methods.create({
          name: 'foo',
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

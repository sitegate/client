'use strict'
const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
const expect = chai.expect
const jimbo = require('jimbo')
const create = require('../../app/methods/create')
const query = require('../../app/methods/query')
const modelsPlugin = require('../../models')
const plugiator = require('plugiator')
const MONGO_URI = 'mongodb://localhost/sitegate-client-tests'
const clearDB = require('mocha-mongoose')(MONGO_URI)

chai.use(chaiAsPromised)

describe('query', function() {
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

  it('should return clients', function() {
    return this._server
      .register([
        {
          register: create,
        },
        {
          register: plugiator.anonymous((server, opts) => {
            return server.methods.create({
                name: 'foo',
                userId: '507f191e810c19729de860ea',
                homepageUrl: 'http://foo.com',
                authCallbackUrl: 'http://foo.com/auth/callback',
              })
          }),
        },
        {
          register: plugiator.anonymous((server, opts) => {
            return server.methods.create({
                name: 'bar',
                userId: '507f191e810c19729de860ea',
                homepageUrl: 'http://bar.com',
                authCallbackUrl: 'http://bar.com/auth/callback',
              })
          }),
        },
        {
          register: query,
        },
      ])
      .then(() => this._server.methods.query({
          count: 2,
        }))
      .then(clients => {
        expect(clients).to.exist
        expect(clients.length).to.eq(2)
      })
  })
})

'use strict'
const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
const expect = chai.expect
const jimbo = require('jimbo')
const create = require('../../app/methods/create')
const getById = require('../../app/methods/get-by-id')
const remove = require('../../app/methods/remove')
const modelsPlugin = require('../../models')
const plugiator = require('plugiator')
const MONGO_URI = 'mongodb://localhost/sitegate-client-tests'
const clearDB = require('mocha-mongoose')(MONGO_URI)

chai.use(chaiAsPromised)

describe('remove', function() {
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

  it('should remove client', function() {
    let clientId
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
              .then(client => clientId = client.id)
          }),
        },
        {
          register: remove,
        },
        {
          register: getById,
        },
      ])
      .then(() => this._server.methods.remove({
          id: clientId,
        }))
      .then(() => this._server.methods.getById({
        id: clientId,
      }))
      .then(client => expect(client).to.not.exist)
  })
})

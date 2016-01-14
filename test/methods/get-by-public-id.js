'use strict'
const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
const expect = chai.expect
const mongotest = require('./mongotest')
const jimbo = require('jimbo')
const create = require('../../app/methods/create')
const getByPublicId = require('../../app/methods/get-by-public-id')
const modelsPlugin = require('../../models')
const plugiator = require('plugiator')

chai.use(chaiAsPromised)

const MONGO_URI = 'mongodb://localhost/sitegate-client-tests'

describe('getByPublicId', function() {
  beforeEach(mongotest.prepareDb(MONGO_URI));
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
  afterEach(mongotest.disconnect());

  it('should get existing client by public id', function() {
    let clientPublicId
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
              .then(client => clientPublicId = client.publicId)
          }),
        },
        {
          register: getByPublicId,
        },
      ])
      .then(() => this._server.methods.getByPublicId({
          publicId: clientPublicId,
        }))
      .then(client => {
        expect(client).to.exist
        expect(client.id).to.exist
      })
  })
})

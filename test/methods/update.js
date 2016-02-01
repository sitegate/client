'use strict'
const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
const expect = chai.expect
const jimbo = require('jimbo')
const update = require('../../app/methods/update')
const create = require('../../app/methods/create')
const modelsPlugin = require('../../models')
const plugiator = require('plugiator')
const MONGO_URI = 'mongodb://localhost/sitegate-client-tests'
const clearDB = require('mocha-mongoose')(MONGO_URI)

chai.use(chaiAsPromised)

describe('update', function() {
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

  it('should update client', function() {
    let clientId
    return server
      .register([
        {
          register: create,
        },
        {
          register: plugiator.anonymous((server, opts) => {
            return server.methods.create({
                name: 'foo',
                description: 'foo bar',
                userId: '507f191e810c19729de860ea',
                homepageUrl: 'http://foo.com',
                authCallbackUrl: 'http://foo.com/auth/callback',
              })
              .then(client => clientId = client.id)
          }),
        },
        {
          register: update,
        },
      ])
      .then(() => server.methods.update({
        id: clientId,
        name: 'foo-updated',
        security: {
          allow: true,
        },
      }))
      .then(client => {
        expect(client).to.exist
        expect(client.id).to.exist
        expect(client.name).to.eq('foo-updated')
      })
  })
})

const Hapi = require('hapi')

const Config = require('../config')
const Formatter = require('./utils/formatter')
const HapiAuthCookie = require('./plugins/hapi-auth-cookie')
const HapiMongoModels = require('./plugins/hapi-mongo-models')
const Routes = require('./routes')

const NAMESPACE = 'server/server'

var server = new Hapi.Server()

server.connection({
  host: Config.host,
  port: Config.port
})

server.register([HapiAuthCookie, HapiMongoModels], function (err) {
  if (err) server.log([NAMESPACE, 'error'], err)

  server.auth.strategy('session', 'cookie', {
    password: 'secret',
    cookie: 'silentdistractions',
    redirectTo: '/login',
    isSecure: false
  })

  server.route(Routes)
  server.start(function (err) {
    if (err) server.log([NAMESPACE, 'error'], err)
    server.log([NAMESPACE, 'info'], 'Starting server at ' + server.info.uri)
  })
})

server.on('log', function (event, tags) {
  Formatter.log(event.tags[1], event.tags[0], event)
})

module.exports = server

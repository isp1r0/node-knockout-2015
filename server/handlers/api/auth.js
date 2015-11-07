const Boom = require('boom')

const User = require('../../models/user')

exports.validate = function (request, reply) {
  var email = request.payload.email || request.payload.username;
  User.findByCredentials(email, request.payload.password, function (err, user) {
    if (err) {
      request.server.log(['server/handlers/api/auth', 'error'], err)
      return reply(Boom.badRequest(err.message))
    }
    reply(user).code(200)
  })
}

const Boom = require('boom')
const Waterfall = require('run-waterfall')

const User = require('../../models/user')

exports.create = function (request, reply) {
  Waterfall([
    User.hashPassword.bind(null, request.payload.password),
    function (hashedPassword, callback) {
      User.validate({
        email: request.payload.email,
        username: request.payload.username,
        password: hashedPassword
      }, callback)
    },
    function (validatedUser, callback) {
      User.insertOne(validatedUser, callback)
    }
  ], function (err, createdUser) {
    if (err) return reply(Boom.badRequest(err.message))
    reply(createdUser[0]._id).code(200)
  })
}

exports.delete = function (request, reply) {
  // TODO needs ifExisting check
  User.deleteOne({ _id: request.params.id }, function (err) {
    if (err) return reply(Boom.badRequest(err.message))
    reply().code(204)
  })
}

exports.find = function (request, reply) {
  // TODO needs ifExisting check
  User.findOne({ _id: request.params.id }, function (err, foundUser) {
    if (err) return reply(Boom.badRequest(err.message))

    delete foundUser.password
    reply(foundUser).code(200)
  })
}

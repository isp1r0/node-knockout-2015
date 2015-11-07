const Boom = require('boom')
const Waterfall = require('run-waterfall')

const List = require('../../models/list')

const NAMESPACE = 'server/handlers/api/list'

exports.create = function (request, reply) {
  Waterfall([
    function (callback) {
      List.validate({
        userId: request.payload.userId,
        type: request.payload.type,
        items: request.payload.items || [],
      }, callback)
    },
    function (validatedList, callback) {
      List.insertOne(validatedList, callback)
    }
  ], function (err, newList) {
    if (err) {
      server.log([NAMESPACE, 'error'], err)
      return reply(Boom.badRequest(err.message))
    }
    reply(newList[0]._id).code(201)
  })
}

exports.delete = function (request, reply) {
  List.deleteOne({ _id: request.params.id }, function (err) {
    if (err) {
      server.log([NAMESPACE, 'error'], err)
      return reply(Boom.badRequest(err.message))
    }
    reply({ message: 'success'}).code(204)
  })
}

exports.find = function (request, reply) {
  List.findOne({ _id: request.params.id }, function (err, list) {
    if (err) {
      server.log([NAMESPACE, 'error'], err)
      return reply(Boom.badRequest(err.message))
    }
    reply(list).code(200)
  })
}

exports.index = function (request, reply) {
  List.find({ userId: request.params.id }, function (err, lists) {
    if (err) {
      server.log([NAMESPACE, 'error'], err)
      return reply(Boom.badRequest(err.message))
    }
    reply(lists).code(200)
  })
}


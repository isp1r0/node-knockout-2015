const Boom = require('boom')
const Waterfall = require('run-waterfall')

const Item = require('../../models/item')
const List = require('../../models/list')

const NAMESPACE = 'server/handlers/api/item'

exports.create = function (request, reply) {
  Waterfall([
    function (callback) {
      var toValidate = {
        listId: request.payload.listId,
        url: request.payload.url,
        shared: {
          message: request.payload.sharedMessage
        }
      }
      if (request.payload.sharedBy) toValidate.shared.by = request.payload.sharedBy
      Item.validate(toValidate, callback)
    },
    function (validatedItem, callback) {
      Item.insertOne(validatedItem, callback)
    },
    function (newItem, callback) {
      List.findOne({ _id: newItem[0].listId }, function (err, list) {
        if (err) return callback(err)
        callback(null, newItem[0], list)
      })
    },
    function (newItem, list, callback) {
      if (!list.items.length) list.items = []
      var items = list.items.push(newItem._id)
      List.updateOne(
        { _id: newItem.listId },
        { items: items },
        function (err) {
          if (err) return callback(err)
          callback(null, newItem)
        })
    }
  ], function (err, newItem) {
    if (err) {
      server.log([NAMESPACE, 'error'], err)
      return reply(Boom.badRequest(err.message))
    }
    reply(newItem._id).code(201)
  })
}

exports.delete = function (request, reply) {
  Item.deleteOne({ _id: request.params.id }, function (err) {
    if (err) {
      server.log([NAMESPACE, 'error'], err)
      return reply(Boom.badRequest(err.message))
    }
    reply({ message: 'success'}).code(204)
  })
}

exports.find = function (request, reply) {
  Item.findOne({ _id: request.params.id }, function (err, item) {
    if (err) {
      server.log([NAMESPACE, 'error'], err)
      return reply(Boom.badRequest(err.message))
    }
    reply(item).code(200)
  })
}

exports.index = function (request, reply) {
  Item.find({ listId: request.params.id }, function (err, items) {
    if (err) {
      server.log([NAMESPACE, 'error'], err)
      return reply(Boom.badRequest(err.message))
    }
    reply(items).code(200)
  })
}


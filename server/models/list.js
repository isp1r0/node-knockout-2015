const BaseModel = require('hapi-mongo-models').BaseModel
const Joi = require('joi')
const ObjectAssign = require('object-assign')
const ShortId32 = require('shortid32')

const SALT_WORK_FACTOR = 10
ShortId32.characters('23456789abcdefghjklmnpqrstuvwxyz')

var List = BaseModel.extend({
  constructor: function (attrs) {
    ObjectAssign(this, attrs)
  }
})

List._collection = 'lists'

List.schema = Joi.object().keys({
  _id: Joi.string().default(ShortId32.generate, 'Generate short id 32'),
  userId: Joi.string(),
  type: Joi.allow(['music', 'book', 'article']),
  items: Joi.array(),
  created: Joi.date().raw().default(Date.now, 'Created'),
  updated: Joi.date().raw(),
  deleted: Joi.date().raw()
})

List.indexes = [
  [{ userId: 1 }, { unique: true }],
  [{ type: 1 }, { unqiue: false }],
  [{ created: 1 }, { unique: false }]
]

module.exports = List

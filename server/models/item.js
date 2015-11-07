const BaseModel = require('hapi-mongo-models').BaseModel
const Joi = require('joi')
const ObjectAssign = require('object-assign')
const ShortId32 = require('shortid32')

const SALT_WORK_FACTOR = 10
ShortId32.characters('23456789abcdefghjklmnpqrstuvwxyz')

var Item = BaseModel.extend({
  constructor: function (attrs) {
    ObjectAssign(this, attrs)
  }
})

Item._collection = 'items'

Item.schema = Joi.object().keys({
  _id: Joi.string().default(ShortId32.generate, 'Generate short id 32'),
  listId: Joi.string(),
  url: Joi.string().uri(),
  shared: {
    by: Joi.string().default('anonymous'),
    message: Joi.string()
  },
  viewed: Joi.boolean().default(false),
  liked: Joi.boolean().default(false),
  created: Joi.date().raw().default(Date.now, 'Created'),
  updated: Joi.date().raw(),
  deleted: Joi.date().raw()
})

Item.indexes = [
  [{ _id: 1 }, { unique: true }],
  [{ listId: 1 }, { unique: false }],
  [{ url: 1 }, { unqiue: false }],
  [{ created: 1 }, { unique: false }]
]

module.exports = Item

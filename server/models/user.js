const BaseModel = require('hapi-mongo-models').BaseModel
const Bcrypt = require('bcrypt')
const Joi = require('joi')
const ObjectAssign = require('object-assign')
const ShortId32 = require('shortid32')

const SALT_WORK_FACTOR = 10
ShortId32.characters('23456789abcdefghjklmnpqrstuvwxyz')

var User = BaseModel.extend({
  constructor: function (attrs) {
    ObjectAssign(this, attrs)
  }
})

User._collection = 'users'

function toLower(string) {
  return string.toLowerCase()
}

User.schema = Joi.object().keys({
  _id: Joi.string().default(ShortId32.generate, 'Generate short id 32'),
  email: Joi.string().required().email().trim().default(toLower, 'Make lower case'),
  username: Joi.string().required().alphanum().min(2).max(20).trim().default(toLower, 'Make lower case'),
  password: Joi.string().required().regex(/[a-zA-Z0-9]{3,30}/),
  isAdmin: Joi.boolean().default(false),
  created: Joi.date().raw().default(Date.now, 'Registered'),
  updated: Joi.date().raw(),
  deleted: Joi.date().raw()
})

User.indexes = [
  [{ email: 1 }, { unique: true }],
  [{ username: 1 }, { unique: true }],
  [{ created: 1}, { unique: false }]
]

User.findByCredentials = function (username, password, done) {
  var query = {}

  if (username.indexOf('@') > -1) {
    query.email = username.toLowerCase()
  } else {
    query.username = username.toLowerCase()
  }

  User.hashPassword(password, function (err, hashedPassword) {
    if (err) return done(err)

    User.findOne(query, function (err, user) {
      if (err) return done(err)
      if (!user) return done(null, false)

      User.isPasswordMatch(password, user.password, function (err, isMatch) {
        if (err) return done(err)
        if (!isMatch) return done(null, false)
        done(null, user)
      })
    })
  })
}

User.hashPassword = function (password, done) {
  Bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return done(err)

    Bcrypt.hash(password, salt, function (err, hashedPassword) {
      if (err) return done(err)
      done(null, hashedPassword)
    })
  })
}

User.isPasswordMatch = function (password, hashedPassword, done) {
  Bcrypt.compare(password, hashedPassword, done)
}

module.exports = User

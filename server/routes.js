const Auth = require('./handlers/api/auth')
const List = require('./handlers/api/list')
const User = require('./handlers/api/user')

module.exports = [
  { method: 'POST', path: '/api/auth', handler: Auth.validate },

  { method: 'GET', path: '/api/user/{id}/lists', handler: List.index },
  { method: 'POST', path: '/api/list', handler: List.create },
  { method: 'DELETE', path: '/api/list/{id}', handler: List.delete },
  { method: 'GET', path: '/api/list/{id}', handler: List.find },

  { method: 'POST', path: '/api/user', handler: User.create },
  { method: 'DELETE', path: '/api/user/{id}', handler: User.delete },
  { method: 'GET', path: '/api/user/{id}', handler: User.find }
]

const Auth = require('./handlers/api/auth')
const User = require('./handlers/api/user')

module.exports = [
  { method: 'POST', path: '/api/auth', handler: Auth.validate },

  { method: 'POST', path: '/api/user', handler: User.create },
  { method: 'DELETE', path: '/api/user/{id}', handler: User.delete },
  { method: 'GET', path: '/api/user/{id}', handler: User.find }
]

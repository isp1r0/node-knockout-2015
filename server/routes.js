const AuthApi = require('./handlers/api/auth')
const ItemApi = require('./handlers/api/item')
const ListApi = require('./handlers/api/list')
const UserApi = require('./handlers/api/user')

module.exports = [
  { method: 'POST', path: '/api/auth', handler: AuthApi.validate },

  { method: 'GET', path: '/api/list/{id}/items', handler: ItemApi.index },
  { method: 'POST', path: '/api/item', handler: ItemApi.create },
  { method: 'DELETE', path: '/api/item/{id}', handler: ItemApi.delete },
  { method: 'GET', path: '/api/item/{id}', handler: ItemApi.find },

  { method: 'GET', path: '/api/user/{id}/lists', handler: ListApi.index },
  { method: 'POST', path: '/api/list', handler: ListApi.create },
  { method: 'DELETE', path: '/api/list/{id}', handler: ListApi.delete },
  { method: 'GET', path: '/api/list/{id}', handler: ListApi.find },

  { method: 'POST', path: '/api/user', handler: UserApi.create },
  { method: 'DELETE', path: '/api/user/{id}', handler: UserApi.delete },
  { method: 'GET', path: '/api/user/{id}', handler: UserApi.find }
]

exports.login = function (request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/')
  }

  var account = {
    password: request.payload.password
  }

  if (request.payload.email.indexOf('@')) {
    account.email = request.payload.email
  } else {
    account.username = request.payload.username
  }

  request.auth.session.set(account)
  return reply.redirect('/')
}

exports.logout = function (request, reply) {
  request.auth.session.clear()
  return reply.redirect('/')
}

exports.register = function (request, reply) {
  reply().view()
}

exports.index = function (request, reply) {
  reply.view('home', { title: 'Home' })
}

const Util = require('util')

exports.log = function (tag, namespace, event) {
  var formatted = Util.format(new Date(event.timestamp), tag.toUpperCase(), namespace, event.data)

  if (tag.debug) return console.error(formatted)
  if (tag.info) return console.info(formatted)
  if (tag.log) return console.log(formatted)

  return console.log(formatted)
}

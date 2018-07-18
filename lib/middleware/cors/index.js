const extend = require('extend2')
const cors = require('@koa/cors')

module.exports = function(options={}) {
  options = extend(true, {
    credentials: true,
    keepHeadersOnError: true,
    maxAge: 24 * 60 * 60
  }, options)

  return cors(options)
}

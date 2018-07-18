const extend = require('extend2')
const CSRF = require('koa-csrf')

module.exports = function(options={}) {
  options = extend(true, {}, options)

  return new CSRF(options)
}
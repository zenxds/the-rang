const extend = require('extend2')
const bodyParser = require('koa-bodyparser')

module.exports = function(options={}) {
  options = extend(true, {
    formLimit: '50mb'
  }, options)

  return bodyParser(options)
}
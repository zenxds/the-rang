/**
 * http://koajs.com/
 */
const extend = require('extend2')
const minify = require('html-minifier').minify

module.exports = function(options={}) {
  options = extend(true, {
    collapseWhitespace: true
  }, options)

  return async function(ctx, next) {
    await next()

    if (!ctx.response.is('html')) {
      return
    }

    let body = ctx.body
    if (!body || body.pipe) {
      return
    }

    if (Buffer.isBuffer(body)) {
      body = body.toString()
    }

    // 压缩可能出错
    try {
      ctx.body = minify(body, options)
    } catch(err) {}
  }
}

const extend = require('extend2')
// const isJSON = require('koa-is-json')
const { truthy } = require('../../helper')

/**
 * onerror handler
 */
module.exports = function(options={}) {
  options = extend(true, {
    isAPI: ctx => /\/api\//.test(ctx.path)
  }, options)

  return async function(ctx, next) {
    const isAPI = truthy(options.isAPI, ctx)
  
    try {
      await next()
  
      if (isAPI) {
        ctx.body = validateStatus(ctx.status) ? {
          success: true,
          data: ctx.body
        } : {
          success: false,
          message: ctx.message
        }
        return
      }
    } catch (err) {
      if (isAPI) {
        ctx.body = {
          success: false,
          message: err.message
        }
        return
      }
  
      ctx.status = err.status || 500
  
      // throw 404
      if (ctx.status === 404) {
        await ctx.render('404', { message: err.message })
      } else {
        await ctx.render('500', { err })
        ctx.app.emit('error', err, ctx)
      }
    }
  
    // not found 404
    if (ctx.status === 404 && !ctx.body) {
      await ctx.render('404', { message: ctx.message })
    }
  }
}

/**
 * from https://github.com/axios/axios
 */
function validateStatus(status) {
  return status >= 200 && status < 300
}

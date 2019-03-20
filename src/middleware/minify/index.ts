/**
 * http://koajs.com/
 */
import * as extend from 'extend2'
import { minify as htmlMinify } from 'html-minifier'

export function minify(options = {}) {
  options = extend(
    true,
    {
      collapseWhitespace: true
    },
    options
  )

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
      ctx.body = htmlMinify(body, options)
    } catch (err) {}
  }
}

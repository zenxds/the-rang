import * as extend from 'extend2'
import * as koaCSRF from 'koa-csrf'

export function csrf(options = {}) {
  options = extend(true, {}, options)

  return new koaCSRF(options)
}

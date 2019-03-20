import * as extend from 'extend2'
import * as koaBodyParser from 'koa-bodyparser'

export function bodyParser(options = {}) {
  options = extend(
    true,
    {
      formLimit: '50mb'
    },
    options
  )

  return koaBodyParser(options)
}

import * as extend from 'extend2'
import * as koaCORS from '@koa/cors'

export function cors(options = {}) {
  options = extend(
    true,
    {
      credentials: true,
      keepHeadersOnError: true,
      maxAge: 24 * 60 * 60
    },
    options
  )

  return koaCORS(options)
}

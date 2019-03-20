import * as schema from 'async-validator'
import * as delegate from 'delegates'

import { KoaApplication, KoaContext } from '../type'

export default class Controller {
  ctx: KoaContext
  app: KoaApplication
  method: string
  protocol: string
  get: (field: string) => string

  constructor(ctx) {
    this.ctx = ctx || {}
  }

  /**
   * Whether it is a GET request
   * @return {boolean} [description]
   */
  isGet(): boolean {
    return this.method.toUpperCase() === 'GET'
  }

  /**
   * Whether it is a POST request
   * @return {boolean} [description]
   */
  isPost(): boolean {
    return this.method.toUpperCase() === 'POST'
  }

  /**
   * Determines whether the METHOD request is specified
   * @param  {[string]}  method [description]
   * @return {boolean}        [description]
   */
  isMethod(method: string): boolean {
    return this.method === method.toUpperCase()
  }

  /**
   * Whether it is an AJAX request
   * @return {boolean} [description]
   */
  isAjax(): boolean {
    return this.get('x-requested-with') === 'XMLHttpRequest'
  }

  /**
   * get request protocol
   * @return {string} [protocol]
   */
  getProtocol(): string {
    return this.get('x-forwarded-proto') || this.protocol
  }

  validate(descriptor, data) {
    const validator = new schema(descriptor)

    return new Promise((resolve, reject) => {
      validator.validate(data, (errors, fields) => {
        if (errors) {
          reject({
            errors,
            fields
          })
        } else {
          resolve()
        }
      })
    })
  }
}

delegate(Controller.prototype, 'ctx')
  .access('app')
  .access('models')
  .access('services')

// ctx response
delegate(Controller.prototype, 'ctx')
  .method('attachment')
  .method('redirect')
  .method('remove')
  .method('vary')
  .method('set')
  .method('append')
  .method('flushHeaders')
  .access('status')
  .access('message')
  .access('body')
  .access('length')
  .access('type')
  .access('lastModified')
  .access('etag')
  .getter('headerSent')
  .getter('writable')

// ctx request
delegate(Controller.prototype, 'ctx')
  .method('acceptsLanguages')
  .method('acceptsEncodings')
  .method('acceptsCharsets')
  .method('accepts')
  .method('get')
  .method('is')
  .access('querystring')
  .access('idempotent')
  .access('socket')
  .access('search')
  .access('method')
  .access('query')
  .access('path')
  .access('url')
  .access('accept')
  .getter('origin')
  .getter('href')
  .getter('subdomains')
  .getter('protocol')
  .getter('host')
  .getter('hostname')
  .getter('URL')
  .getter('header')
  .getter('headers')
  .getter('secure')
  .getter('stale')
  .getter('fresh')
  .getter('ips')
  .getter('ip')

// ctx
delegate(Controller.prototype, 'ctx')
  .method('inspect')
  .method('toJSON')
  .method('assert')
  .method('throw')
  .access('request')
  .access('response')
  .access('req')
  .access('res')
  .access('state')
  .access('originalUrl')
  .access('cookies')

// extra
delegate(Controller.prototype, 'ctx')
  .access('session')
  .method('render')

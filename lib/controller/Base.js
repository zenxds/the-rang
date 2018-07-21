const delegate = require('delegates')

class Controller {
  constructor(ctx) {
    this.ctx = ctx || {}
    this.app = this.ctx.app || {}
  }

  /**
   * Whether it is a GET request
   * @return {boolean} [description]
   */
  isGet() {
    return this.ctx.method === 'GET'
  }

  /**
   * Whether it is a POST request
   * @return {boolean} [description]
   */
  isPost() {
    return this.ctx.method === 'POST'
  }

  /**
   * Determines whether the METHOD request is specified
   * @param  {[string]}  method [description]
   * @return {boolean}        [description]
   */
  isMethod(method) {
    return this.ctx.method === method.toUpperCase()
  }

  /**
   * Whether it is an AJAX request
   * @return {boolean} [description]
   */
  isAjax() {
    return this.ctx.get('x-requested-with') === 'XMLHttpRequest'
  }

  /**
   * get request protocol
   * @return {string} [protocol]
   */
  getProtocol() {
    return this.ctx.get('x-forwarded-proto') || this.ctx.protocol
  }
}

delegate(Controller.prototype, 'app')
  .access('models')
  .access('services')

// response
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

// response
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

// extra
delegate(Controller.prototype, 'ctx')
  .method('inspect')
  .method('toJSON')
  .method('assert')
  .method('throw')
  .access('cookies')
  .access('session')
  .access('render')

module.exports = Controller
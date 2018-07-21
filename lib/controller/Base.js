class Controller {
  constructor(ctx, app) {
    this.ctx = ctx || {}
    this.app = app || {}
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

module.exports = Controller
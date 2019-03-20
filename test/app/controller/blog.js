const { Controller } = require('../../../lib')

class BlogController extends Controller {
  async index(next) {
    this.body = 'Hello'
    await next()
  }

  async index2(next) {
    this.body += ' World'
    await next()
  }

  async index3(next) {
    this.body += ' TheRang'
  }
}

module.exports = BlogController
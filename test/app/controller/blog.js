const Base = require('../../../lib/controller/Base')

class BlogController extends Base {
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
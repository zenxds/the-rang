const delegate = require('delegates')

class Service {
  constructor(ctx) {
    this.ctx = ctx || {}
    this.app = this.ctx.app || {}
  }
}

delegate(Service.prototype, 'ctx')
  .access('models')
  .access('services')

module.exports = Service
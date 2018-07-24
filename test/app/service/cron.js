const Service = require('../../../lib/service/Base')

class CronService extends Service {
  constructor(ctx) {
    super(ctx)
  }

  getProtocol() {
    return this.ctx.protocol
  }
}

module.exports = CronService
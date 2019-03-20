import * as delegate from 'delegates'
import { KoaApplication, KoaContext } from '../type'

export default class Service {
  ctx: KoaContext
  app: KoaApplication

  constructor(ctx) {
    this.ctx = ctx || {}
  }
}

delegate(Service.prototype, 'ctx')
  .access('app')
  .access('models')
  .access('services')

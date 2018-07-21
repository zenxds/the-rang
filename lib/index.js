const fs = require('fs')
const path = require('path')
const extend = require('extend2')
const Koa = require('koa')
const log4js = require('log4js')
const delegate = require('delegates')

const Router = require('./Router')
const Controller = require('./controller/Base')
const Service = require('./service/Base')
const helpers = require('./helper')
const services = require('./service')
const middlewares = require('./middleware')
const decorators = require('./decorator')

/**
 * 后续可以抽象出插件机制
 * 从package.json里取出插件列表，require并注册
 */
class Application extends Koa {
  constructor(options={}) {
    super()

    options = extend(true, {
      root: process.cwd()
    }, options)

    this.options = options
    this.keys = options.keys
    this.root = options.root
    this.isProduction = /^(prod|production)$/.test(this.env)

    this.models = this.walk('app/model')
    this.services = extend({}, services, this.walk('app/service'))
    this.middlewares = extend({}, middlewares, this.walk('app/middleware'))
    this.controllers = this.walk('app/controller', this.controllerCallback)

    delegate(this.context, 'app')
      .access('controllers')
      .access('models')
      .access('services')

    this.initLogger()
  }

  walk(dir, callback) {
    return helpers.walk(this.resolve(dir), callback)
  }

  resolve(dir) {
    return path.resolve(this.root, dir)
  }

  controllerCallback(p) {
    const F = require(p)

    // 不是Class的格式
    if (!helpers.isFunction(F)) {
      return F
    }

    // 先初始化一个实例来占位
    const instance = new F()

    if (instance instanceof Controller) {
      return new Proxy(instance, {
        get: function(obj, prop) {
          let method = obj[prop]
          if (!helpers.isAsyncFunction(method)) {
            return method
          }

          method.Controller = F
          method.Action = prop

          return method
        }
      })
    }

    return F
  }
  
  initLogger() {
    const loggerConfigFile = this.resolve('config/log4js/index.js')
    const loggerConfig = fs.existsSync(loggerConfigFile) ? require(loggerConfigFile) : require('./config/log4js')

    log4js.configure(loggerConfig)

    helpers.each(loggerConfig.categories, (v, k) => {
      const loggerName = k + 'Logger'

      this[loggerName] = log4js.getLogger(k)
      delegate(this.context, 'app').access(loggerName)
    })
  }
}

module.exports = {
  Application,
  Router,
  Controller,
  Service,
  services,
  middlewares,
  decorators,
  helpers
}
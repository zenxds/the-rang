const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const log4js = require('log4js')
const extend = require('extend2')
const delegate = require('delegates')

const Router = require('./Router')
const Service = require('./service/Base')
const Controller = require('./controller/Base')
const PluginLoader = require('./loader/plugin')
const helpers = require('./helper')
const services = require('./service')
const middlewares = require('./middleware')

const MODEL_CALLBACK = Symbol('modelCallback')
const CONTROLLER_CALLBACK = Symbol('controllerCallback')

let currentApp = null

class Application extends Koa {
  constructor(options={}) {
    super()

    options = extend(true, {
      root: process.cwd(),
      plugins: {}
    }, options)

    currentApp = this

    this.options = options
    this.keys = options.keys
    this.root = options.root
    this.isProduction = /^(prod|production)$/.test(this.env)
    this.pluginLoader = new PluginLoader({
      app: this,
      plugins: options.plugins
    })

    this.models = this.walk('app/model', this[MODEL_CALLBACK])
    this.controllers = this.walk('app/controller', this[CONTROLLER_CALLBACK])
    this.services = extend({}, services, this.pluginLoader.services, this.walk('app/service'))
    this.middlewares = extend({}, middlewares, this.pluginLoader.middlewares, this.walk('app/middleware'))

    delegate(this.context, 'app').access('models')

    this.initLogger()
  }

  createContext(req, res) {
    const ctx = super.createContext(req, res)
    
    ctx.services = helpers.walkObject(this.services, (key, value, obj) => {
      if (helpers.isFunction(value) && value.prototype instanceof Service) {
        // lazy init a service
        obj.__defineGetter__(key, function() {
          let cacheKey = '__service__' + key
          obj[cacheKey] = obj[cacheKey] || new value(ctx)

          return obj[cacheKey]
        })

        return false
      }

      return {
        key,
        value
      }
    })

    return ctx
  }

  walk(dir, callback) {
    return helpers.walkDir(this.resolve(dir), callback)
  }

  resolve(dir) {
    return path.resolve(this.root, dir)
  }

  [MODEL_CALLBACK](p) {
    const Model = require(p)

    // not sequelize Model
    if (!helpers.isFunction(Model) || !helpers.isFunction(Model.findAll)) {
      return false
    }

    return {
      key: helpers.camelize(path.basename(p, '.js'), true),
      value: Model
    }
  }

  [CONTROLLER_CALLBACK](p) {
    const basename = path.basename(p, '.js')
    const F = require(p)
    const ret = {
      key: basename,
      value: F
    }

    // 不是Class的格式
    if (!helpers.isFunction(F)) {
      return ret
    }

    // 先初始化一个实例来占位
    const instance = new F()

    if (instance instanceof Controller) {
      return {
        key: basename,
        value: new Proxy(instance, {
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
    }

    return ret
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
  helpers,

  getApp() {
    return currentApp
  }
}
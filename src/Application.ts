import * as fs from 'fs'
import * as path from 'path'
import * as Koa from 'koa'
import * as log4js from 'log4js'
import * as delegate from 'delegates'
import { Sequelize } from 'sequelize'

import BaseController from './controller/Base'
import BaseService from './service/Base'
import * as middlewares from './middleware'
import * as services from './service'
import PluginLoader from './loader/plugin'
import {
  extend,
  each,
  isFunction,
  isAsyncFunction,
  isExtendsFrom,
  walkDir,
  walkObject,
  camelize
} from './helper'

interface DBOptions {
  database: string
  username: string
  password: string
  host: string
  port: number
  dialect: any
}

interface ApplicationOptions {
  keys: string[]
  root?: string
  plugins?: object
  db?: DBOptions
}

export default class Application extends Koa {
  options: ApplicationOptions
  root: string
  isProductionEnv: boolean
  pluginLoader: PluginLoader
  models: object
  controllers: object
  services: object
  middlewares: object
  sequelize: any

  constructor(options: ApplicationOptions) {
    super()

    this.options = options
    this.keys = options.keys
    this.root = options.root || process.cwd()
    this.isProductionEnv = /^(prod|production)$/.test(this.env)
    this.pluginLoader = new PluginLoader({
      app: this,
      plugins: options.plugins
    })

    this.initMiddlewares()
    this.initControllers()
    this.initModels()
    this.initServices()
    this.initLogger()
  }

  initMiddlewares() {
    this.middlewares = extend(
      {},
      middlewares,
      this.pluginLoader.middlewares,
      this.walkDir('app/middleware')
    )
  }

  initControllers() {
    this.controllers = this.walkDir('app/controller', this.controllerCallback)
  }

  initModels() {
    const db = this.options.db

    if (!db) {
      return
    }

    const sequelize = new Sequelize(db.database, db.username, db.password, {
      host: db.host,
      port: db.port,
      dialect: db.dialect,
      logging: this.isProductionEnv ? false : console.log
    })
    const models = {}

    this.walkDir('app/model', (p: string) => {
      const model = sequelize.import(p)
      models[camelize(model.name, true)] = model
      return false
    })

    Object.keys(models).forEach(modelName => {
      if (models[modelName].associate) {
        models[modelName].associate(models)
      }
    })

    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully')
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err)
      })

    this.sequelize = sequelize
    this.models = models
    delegate(this.context, 'app').access('models')
  }

  initServices() {
    this.services = extend(
      {},
      services,
      this.pluginLoader.services,
      this.walkDir('app/service')
    )
  }

  initLogger() {
    const loggerConfigFile = this.resolve('config/log4js/index.js')
    const loggerConfig = fs.existsSync(loggerConfigFile)
      ? require(loggerConfigFile)
      : require('./config/log4js').default

    log4js.configure(loggerConfig)

    each(loggerConfig.categories, (v, k) => {
      const loggerName = k + 'Logger'

      this[loggerName] = log4js.getLogger(k)
      delegate(this.context, 'app').access(loggerName)
    })
  }

  initContextServices(ctx) {
    ctx.services = walkObject(
      this.services,
      (key: string, value: any, obj: object) => {
        /**
         * class MyService extends Service {}
         */
        if (isExtendsFrom(value, BaseService)) {
          return {
            key,
            value: new Proxy(value.prototype, {
              get: function(obj, prop) {
                const service = new value(ctx)

                if (
                  isAsyncFunction(service[prop]) ||
                  isFunction(service[prop])
                ) {
                  return service[prop]()
                }

                return service[prop]
              }
            })
          }
        }

        return {
          key,
          value
        }
      }
    )
  }

  createContext(req, res) {
    const ctx = super.createContext(req, res)

    this.initContextServices(ctx)
    return ctx
  }

  controllerCallback(p) {
    const basename = path.basename(p, '.js')
    const Controller = require(p)
    const ret = {
      key: basename,
      value: Controller
    }

    if (!isExtendsFrom(Controller, BaseController)) {
      return ret
    }

    return {
      key: basename,
      value: new Proxy(Controller.prototype, {
        get: function(obj, prop) {
          return async function(ctx, next) {
            const controller = new Controller(ctx)

            if (isAsyncFunction(controller[prop])) {
              return controller[prop](next)
            }

            if (isFunction(controller[prop])) {
              console.warn(
                `Controller ${p}: method ${String(
                  prop
                )} should be async function`
              )
              return controller[prop](next)
            }
          }
        }
      })
    }
  }

  walkDir(dir: string, callback?: (p: string) => any): object {
    return walkDir(this.resolve(dir), callback)
  }

  resolve(dir: string): string {
    return path.resolve(this.root, dir)
  }
}

/**
 * 插件loader
 * 扩展Application、Context、Request、Response
 * 注册middleware、service
 */
import { each, extend, camelize } from '../helper'
import { KoaApplication } from '../type'

interface LoaderOptions {
  app: KoaApplication
  plugins?: object
}

interface Plugin {
  application?: object
  context?: object
  request?: object
  response?: object
  service?: any
  middleware?: any
}

export default class PluginLoader {
  app: KoaApplication
  plugins: object
  services: object
  middlewares: object

  constructor(options: LoaderOptions) {
    this.app = options.app
    this.plugins = options.plugins || {}
    this.services = {}
    this.middlewares = {}

    each(this.plugins, (plugin, name) => {
      if (plugin.enable) {
        this.load(name, plugin.package, plugin.options)
      }
    })
  }

  load(name: string, pkg: string = `the-rang-${name}`, options: object) {
    const plugin: Plugin = require(pkg)(options, this.app)

    this.extendApplication(plugin.application)
    this.extendContext(plugin.context)
    this.extendRequest(plugin.request)
    this.extendResponse(plugin.response)
    this.registerService(name, plugin.service)
    this.registerMiddleware(name, plugin.middleware)
  }

  extendApplication(obj: object | undefined) {
    if (!obj) {
      return
    }

    extend(this.app, obj)
  }

  extendContext(obj: object | undefined) {
    if (!obj) {
      return
    }

    extend(this.app.context, obj)
  }

  extendRequest(obj: object | undefined) {
    if (!obj) {
      return
    }

    extend(this.app.request, obj)
  }

  extendResponse(obj: object | undefined) {
    if (!obj) {
      return
    }

    extend(this.app.response, obj)
  }

  registerMiddleware(name: string, middleware: any) {
    if (!middleware) {
      return
    }

    extend(this.middlewares, {
      [camelize(name)]: middleware
    })
  }

  registerService(name: string, service: any) {
    if (!service) {
      return
    }

    extend(this.services, {
      [camelize(name)]: service
    })
  }
}

/**
 * 插件loader
 * 扩展Application、Context、Request、Response
 * 注册middleware、service
 */
const { each, extend, camelize } = require('../helper')

class PluginLoader {
  constructor(options={}) {
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

  load(name, pkg, options={}) {
    pkg = pkg || `the-rang-${name}`

    const result = require(pkg)(options)

    this.extendApplication(result.application)
    this.extendContext(result.context)
    this.extendRequest(result.request)
    this.extendResponse(result.response)
    this.registerService(name, result.service)
    this.registerMiddleware(name, result.middleware)
  }

  extendApplication(obj) {
    if (!obj) {
      return
    }

    extend(this.app, obj)
  }

  extendContext(obj) {
    if (!obj) {
      return
    }

    extend(this.app.context, obj)
  }

  extendRequest(obj) {
    if (!obj) {
      return
    }

    extend(this.app.request, obj)
  }

  extendResponse(obj) {
    if (!obj) {
      return
    }

    extend(this.app.response, obj)
  }

  registerMiddleware(name, middleware) {
    if (!middleware) {
      return
    }

    this.middlewares[camelize(name)] = middleware
  }

  registerService(name, service) {
    if (!service) {
      return
    }

    this.services[camelize(name)] = service
  }
}

module.exports = PluginLoader
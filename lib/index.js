const fs = require('fs')
const path = require('path')
const extend = require('extend2')
const Koa = require('koa')
const Router = require('koa-router')
const log4js = require('log4js')
const Controller = require('./controller/Base')
const Service = require('./service/Base')
const services = require('./service')
const middlewares = require('./middleware')
const decorators = require('./decorator')
const helpers = require('./helper')

class Application extends Koa {
  constructor(options={}) {
    super()

    options = extend(true, {
      root: process.cwd()
    }, options)

    this.options = options
    this.root = options.root
    this.keys = options.keys
    this.isProduction = /^(prod|production)$/.test(this.env)

    this.initLogger()
  }

  initLogger() {
    const loggerConfigFile = path.join(this.root, 'config/log4js/index.js')
    const loggerConfig = fs.existsSync(loggerConfigFile) ? require(loggerConfigFile) : require('./config/log4js')

    log4js.configure(loggerConfig)

    helpers.each(loggerConfig.categories, (v, k) => {
      this[k + 'Logger'] = log4js.getLogger(k)
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
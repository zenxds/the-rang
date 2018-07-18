const extend = require('extend2')
const Koa = require('koa')
const Router = require('koa-router')
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
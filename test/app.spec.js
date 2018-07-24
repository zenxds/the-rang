const path = require('path')
const { Application, getApp } = require('../lib')

const app = new Application({
  root: __dirname,
  keys: ['58f9014fb686fe9b6449f1769e37ec90a676e9c6'],

  plugins: {
    'ding-crop': {
      enable: true,
      options: {}
    }
  }
})

test('application', () => {
  expect(app.options).toBeTruthy()
  expect(app.root).toBe(__dirname)
  expect(app.keys).toBeTruthy()
  expect(app.isProduction).toBeFalsy()

  expect(app.controllers).toBeTruthy()
  expect(app.services).toBeTruthy()
  expect(app.models).toBeTruthy()
  expect(app.middlewares).toBeTruthy()

  expect(app.models.User).toBeTruthy()
  expect(Object.keys(app.models).length).toBe(1)

  expect(app.services.dingCrop).toBeTruthy()
  expect(app.services.dingCrop.apiServer).toBe('https://oapi.dingtalk.com')

  expect(app.defaultLogger).toBeTruthy()
  expect(app.appLogger).toBeTruthy()
  expect(app.errorLogger).toBeTruthy()

  const ctx = app.createContext({}, {})
  expect(ctx.models).toBe(app.models)
  expect(ctx.services).toBeTruthy()
  expect(ctx.defaultLogger).toBe(app.defaultLogger)
  expect(ctx.appLogger).toBe(app.appLogger)
  expect(ctx.errorLogger).toBe(app.errorLogger)

  expect(ctx.services.cron.ctx).toBe(ctx)
  expect(ctx.services.cron.app).toBe(app)
  expect(ctx.services.__service__cron).toBeTruthy()
})
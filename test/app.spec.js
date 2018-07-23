const path = require('path')
const { Application, middlewares, services } = require('../lib')

const app = new Application({
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
  expect(app.keys).toBeTruthy()
  expect(app.isProduction).toBeFalsy()
  expect(app.root).toBe(path.join(__dirname, '..'))

  expect(app.controllers).toBeTruthy()
  expect(app.services).toBeTruthy()
  expect(app.models).toBeTruthy()
  expect(app.middlewares).toBeTruthy()

  expect(app.services.dingCrop).toBeTruthy()
  expect(app.services.dingCrop.apiServer).toBe('https://oapi.dingtalk.com')

  expect(app.defaultLogger).toBeTruthy()
  expect(app.appLogger).toBeTruthy()
  expect(app.errorLogger).toBeTruthy()

  const ctx = app.createContext({}, {})
  expect(ctx.models).toBe(app.models)
  expect(ctx.services).toBe(app.services)
  expect(ctx.defaultLogger).toBeTruthy()
  expect(ctx.appLogger).toBeTruthy()
  expect(ctx.errorLogger).toBeTruthy()
})
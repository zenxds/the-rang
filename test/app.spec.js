const path = require('path')
const { Application, middlewares, services } = require('../lib')

const app = new Application({
  keys: ['58f9014fb686fe9b6449f1769e37ec90a676e9c6']
})

test('application', () => {
  expect(app.keys).toBeTruthy()
  expect(app.options).toBeTruthy()
  expect(app.root).toBe(path.join(__dirname, '..'))
  expect(app.isProduction).toBeFalsy()
  expect(app.controllers).toBeTruthy()
  expect(app.services).toBeTruthy()

  expect(app.defaultLogger).toBeTruthy()
  expect(app.appLogger).toBeTruthy()
  expect(app.errorLogger).toBeTruthy()

  const ctx = app.createContext({}, {})
  expect(ctx.controllers).toBe(app.controllers)
  expect(ctx.models).toBe(app.models)
  expect(ctx.services).toBe(app.services)
})
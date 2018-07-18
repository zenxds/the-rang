const path = require('path')
const { Application, middlewares } = require('../lib')

const app = new Application({
  keys: ['58f9014fb686fe9b6449f1769e37ec90a676e9c6']
})

test('application', () => {
  expect(app.keys).toBeTruthy()
  expect(app.options).toBeTruthy()
  expect(app.root).toBe(path.join(__dirname, '..'))
  expect(app.isProduction).toBeFalsy()

  expect(app.defaultLogger).toBeTruthy()
  expect(app.appLogger).toBeTruthy()
  expect(app.errorLogger).toBeTruthy()
})
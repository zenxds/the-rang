const path = require('path')
const { Controller } = require('../../lib')

test('Controller', async() => {
  const controller = new Controller({
    app: {},
    models: {},
    services: {},
    method: 'get'
  })

  expect(controller.ctx).toBeTruthy()
  expect(controller.app).toBeTruthy()
  expect(controller.models).toBeTruthy()
  expect(controller.services).toBeTruthy()
  expect(controller.isGet()).toBeTruthy()

  let result = await controller.validate({
    title: { type: 'string' },
    content: { type: 'string' }
  }, {
    title: 'title',
    content: 'content'
  })
  expect(result).toBeFalsy()

  await controller.validate({
    title: { type: 'string' },
    content: { type: 'string' }
  }, {
    title: 1,
    content: 2
  }).catch(err => {
    expect(err.errors).toBeTruthy()
    expect(err.fields).toBeTruthy()
  })
})
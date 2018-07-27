const path = require('path')
const { Controller } = require('../lib')

test('Controller', async() => {
  const controller = new Controller()

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
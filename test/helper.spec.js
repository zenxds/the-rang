const path = require('path')
const { truthy } = require('../lib/helper')

describe('helper', () => {
  test('truthy', () => {
    expect(truthy(true)).toBeTruthy()
    expect(truthy(123)).toBeTruthy()
    expect(truthy(false)).toBeFalsy()
    expect(truthy(0)).toBeFalsy()

    expect(truthy(/\/api\//, '/api/test')).toBeTruthy()
    expect(truthy(/\/api\//, '/api2/test')).toBeFalsy()

    expect(truthy(o => o.title, { title: 't' })).toBeTruthy()
    expect(truthy(o => o.title, { title: '' })).toBeFalsy()
  })
})

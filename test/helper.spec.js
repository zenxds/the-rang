const path = require('path')
const { camelize, truthy, walkDir, walkObject } = require('../lib/helper')

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

  test('walkDir', () => {
    expect(walkDir(path.join(__dirname, 'app/controller'))).not.toEqual({})
    expect(walkDir(path.join(__dirname, 'app/controller'), () => false)).toEqual({})
  })

  test('walkObject', () => {
    const obj = {
      a: {
        b: {
          c: 'abc'
        }
      }
    }

    expect(walkObject(obj)).toEqual(obj)
    expect(walkObject(obj, () => false)).toEqual({
      a: {
        b: {}
      }
    })
  })

  test('camelize', () => {
    expect(camelize('the-rang')).toBe('theRang')
    expect(camelize('the-rang', true)).toBe('TheRang')
  })
})

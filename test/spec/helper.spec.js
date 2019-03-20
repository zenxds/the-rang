const path = require('path')
const { camelize, isTruthy, walkDir, walkObject } = require('../../lib/helper')

describe('helper', () => {
  test('isTruthy', () => {
    expect(isTruthy(true)).toBeTruthy()
    expect(isTruthy(123)).toBeTruthy()
    expect(isTruthy(false)).toBeFalsy()
    expect(isTruthy(0)).toBeFalsy()

    expect(isTruthy(/\/api\//, '/api/test')).toBeTruthy()
    expect(isTruthy(/\/api\//, '/api2/test')).toBeFalsy()

    expect(isTruthy(o => o.title, { title: 't' })).toBeTruthy()
    expect(isTruthy(o => o.title, { title: '' })).toBeFalsy()
  })

  test('walkDir', () => {
    expect(walkDir(path.join(__dirname, '../app/controller'))).not.toEqual({})
    expect(walkDir(path.join(__dirname, '../app/controller'), () => false)).toEqual({})
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

import * as extend from 'extend2'
import { isFunction, isRegExp } from './isType'

export * from './isType'
export * from './walk'
export { extend }

/**
 * camelize a string
 * upperFirst - uppercase first char
 */
export function camelize(str: string, upperFirst = false): string {
  let ret = str.replace(/[-_][^-_]/g, function(match) {
    return match.charAt(1).toUpperCase()
  })

  return upperFirst ? ret.charAt(0).toUpperCase() + ret.substring(1) : ret
}

/**
 * each object and array
 */
export function each(object, fn) {
  let length = object.length

  if (length === +length) {
    for (let i = 0; i < length; i++) {
      if (fn(object[i], i, object) === false) {
        break
      }
    }
  } else {
    for (let i in object) {
      if (object.hasOwnProperty(i) && fn(object[i], i, object) === false) {
        break
      }
    }
  }
}

/**
 * test if result is true
 * support regexp and function
 */
export function isTruthy(v, ...args) {
  if (isRegExp(v)) {
    return v.test(args[0])
  }

  if (isFunction(v)) {
    return !!v(...args)
  }

  return !!v
}

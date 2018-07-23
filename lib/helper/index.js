const extend = require('extend2')
const walk = require('./walk')

const toString = Object.prototype.toString
const isType = (type) => {
  return function(obj) {
    return toString.call(obj) == "[object " + type + "]"
  }
}
const isFunction = isType('Function')
const isAsyncFunction = isType('AsyncFunction')
const isRegExp = isType('RegExp')

module.exports = {
  isFunction,
  isAsyncFunction,
  extend,

  /**
   * test if result is true
   * support regexp and function
   */
  truthy: (v, ...args) => {
    if (isRegExp(v)) {
      return v.test(args[0])
    }
  
    if (isFunction(v)) {
      return !!v(...args)
    }
  
    return !!v
  },

  /**
   * each object and array
   */
  each: (object, fn) => {
    let length = object.length
  
    if (length === +length) {
      for (let i = 0; i < length; i++) {
        if (fn(object[i], i, object) === false) {
          break
        }
      }
    } else {
      for (let i in object) {
        if (object.hasOwnProperty(i) && (fn(object[i], i, object) === false)) {
          break
        }
      }
    }
  },

  /**
   * camelize a string
   */
  camelize: (str) => {
    return str.replace(/[-_][^-_]/g, function(match) {
      return match.charAt(1).toUpperCase()
    })
  },

  walk
}
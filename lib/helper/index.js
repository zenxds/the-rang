const extend = require('extend2')
const isType = require('./isType')
const walk = require('./walk')

const { isFunction, isRegExp } = isType

module.exports = {
  extend,

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
   * camelize a string
   * ucfirst - uppercase first char
   */
  camelize: (str, ucfirst) => {
    let ret = (str + '').replace(/[-_][^-_]/g, function(match) {
      return match.charAt(1).toUpperCase()
    })

    return ucfirst ? ret.charAt(0).toUpperCase() + ret.substring(1) : ret
  }
}

extend(module.exports, isType)
extend(module.exports, walk)
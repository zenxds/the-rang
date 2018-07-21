const extend = require('extend2')
const walk = require('./walk')
const { md5, sha1 } = require('./crypto')

const toString = Object.prototype.toString
const isType = (type) => {
  return function(obj) {
    return toString.call(obj) == "[object " + type + "]"
  }
}
const isFunction = isType('Function')
const isRegExp = isType('RegExp')

function truthy(v, ...args) {
  if (isRegExp(v)) {
    return v.test(args[0])
  }

  if (isFunction(v)) {
    return !!v(...args)
  }

  return !!v
}

function each(object, fn) {
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
}

module.exports = {
  isFunction,
  truthy,
  each,
  extend,

  walk,

  md5,
  sha1
}
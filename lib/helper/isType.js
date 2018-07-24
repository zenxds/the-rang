const toString = Object.prototype.toString
const isType = (type) => {
  return function(obj) {
    return toString.call(obj) == "[object " + type + "]"
  }
}

const isFunction = isType('Function')
const isAsyncFunction = isType('AsyncFunction')
const isRegExp = isType('RegExp')
const isObject = isType('Object')
const isPlainObject = obj => {
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype
}

module.exports = {
  isFunction,
  isAsyncFunction,
  isRegExp,
  isObject,
  isPlainObject
}
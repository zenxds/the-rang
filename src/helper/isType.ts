const isType = (type: string) => {
  return (obj: any): boolean => {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
  }
}

export const isFunction = isType('Function')
export const isAsyncFunction = isType('AsyncFunction')
export const isRegExp = isType('RegExp')
export const isObject = isType('Object')
export const isPlainObject = (obj: any): boolean => {
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype
}

export const isExtendsFrom = (Child: any, Parent: any): boolean => {
  return isFunction(Child) && Child.prototype instanceof Parent
}

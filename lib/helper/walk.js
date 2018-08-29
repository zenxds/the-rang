const fs = require('fs')
const path = require('path')

const { isPlainObject } = require('./isType')

/**
 * 递归把目录下的JS文件转成对象的嵌套
 * 默认require对应JS
 * callback 对应叶子节点的回调，可以修改key和value
 */
function walkDir(dir, callback) {
  const ret = {}

  // 标识是目录
  Object.defineProperty(ret, '__dir', {
    value: true,
    writable: false,
    enumerable: false
  })

  if (!fs.existsSync(dir)) {
    return ret
  }

  const _callback = callback || function(p) {
    return {
      key: path.basename(p, '.js'),
      value: require(p)
    }
  }

  const files = fs.readdirSync(dir)

  for (let file of files) {
    let p = path.join(dir, file)
    let stat = fs.statSync(p)

    if (stat.isFile() && path.extname(p) === '.js') {
      const result = _callback(p)

      // filter
      if (result === false) {
        continue
      }
      
      ret[result.key] = result.value
    } else if (stat.isDirectory()) {
      ret[path.basename(p)] = walkDir(p, callback)
    }
  }

  return ret
}

/**
 * walk object
 */
function walkObject(obj, callback) {
  const ret = {}
  if (!isPlainObject(obj)) {
    return ret
  }

  const _callback = callback || function(key, value, obj) {
    return {
      key,
      value
    }
  }

  Object.keys(obj).forEach((key) => {
    let value = obj[key]

    if (isPlainObject(value)) {
      ret[key] = walkObject(value, callback)
    } else {
      const result = _callback(key, value, ret)

      // filter
      if (result === false) {
        return
      }

      ret[result.key] = result.value
    }
  })

  return ret
}


module.exports = {
  walkDir,
  walkObject
}
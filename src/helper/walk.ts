import * as fs from 'fs'
import * as path from 'path'

import { isPlainObject } from './isType'

/**
 * 递归把目录下的JS文件转成对象的嵌套
 * 默认require对应JS
 * callback 对应叶子节点的回调，可以修改key和value
 */
export function walkDir(dir: string, callback?: (p: string) => any): object {
  const ret = {}

  if (!fs.existsSync(dir)) {
    return ret
  }

  const fn =
    callback ||
    function(p) {
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
      const result = fn(p)

      // filter
      if (result === false) {
        continue
      }

      ret[result.key] = result.value
    } else if (stat.isDirectory()) {
      ret[path.basename(p)] = walkDir(p, fn)
    }
  }

  return ret
}

/**
 * walk object
 */
export function walkObject(
  obj,
  callback?: (key: string, value: any, obj: object) => any
): object {
  const ret = {}

  if (!isPlainObject(obj)) {
    return ret
  }

  const fn =
    callback ||
    function(key, value, obj) {
      return {
        key,
        value
      }
    }

  Object.keys(obj).forEach(key => {
    let value = obj[key]

    if (isPlainObject(value)) {
      ret[key] = walkObject(value, fn)
    } else {
      const result = fn(key, value, ret)

      // filter
      if (result === false) {
        return
      }

      ret[result.key] = result.value
    }
  })

  return ret
}

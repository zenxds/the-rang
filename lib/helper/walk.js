const fs = require('fs')
const path = require('path')

/**
 * 递归把目录下的JS文件转成对象的嵌套
 * 默认require对应JS
 */
function walk(dir, callback) {
  const ret = {}
  if (!fs.existsSync(dir)) {
    return ret
  }
  
  callback = callback || function(p) {
    return require(p)
  }

  const ext = '.js'
  const files = fs.readdirSync(dir)

  for (let file of files) {
    let p = path.join(dir, file)
    let stat = fs.statSync(p)

    if (stat.isFile() && path.extname(p) === ext) {
      ret[path.basename(p, ext)] = callback(p)
    } else if (stat.isDirectory()) {
      ret[path.basename(p)] = walk(p)
    }
  }

  return ret
}

module.exports = walk
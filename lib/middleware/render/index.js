const path = require('path')
const extend = require('extend2')
const nunjucks = require('nunjucks')
const views = require('koa-views')

const { each } = require('../../helper')
const defaultFilters = require('./filters')

module.exports = function(app, options={}) {
  options = extend(true, {
    root: path.join(app.root, 'app/view')
  }, options)
  options.filters = extend(true, {}, defaultFilters, options.filters || {})

  const rootPath = options.root
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(rootPath)
  )

  each(options.filters, (filter, key) => {
    env.addFilter(key, filter)
  })

  return views(rootPath, {
    map: {
      html: 'nunjucks'
    },
    extension: 'html',
    options: {
      nunjucksEnv: env
    }
  })
}

import * as path from 'path'
import * as nunjucks from 'nunjucks'
import * as koaViews from 'koa-views'

import { extend, each } from '../../helper'
import defaultFilters from './filters'

interface RenderOptions {
  root?: string
  filters?: object
}

export function render(app, options: RenderOptions = {}) {
  options = extend(
    true,
    {
      root: path.join(app.root, 'app/view')
    },
    options
  )

  options.filters = extend(true, {}, defaultFilters, options.filters || {})

  const rootPath = options.root
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(rootPath))

  each(options.filters, (filter, key) => {
    env.addFilter(key, filter)
  })

  return koaViews(rootPath, {
    map: {
      html: 'nunjucks'
    },
    extension: 'html',
    options: {
      nunjucksEnv: env
    }
  })
}

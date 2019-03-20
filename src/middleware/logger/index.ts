import * as path from 'path'
import rfs from 'rotating-file-stream'
import morgan from './morgan'

const loggerFormat =
  ':real-ip [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'

interface Stream {
  path?: string
  interval?: string
}

interface loggerOptions {
  format?: string
  filename?: string
  stream?: Stream
}

export function logger(app, options: loggerOptions = {}) {
  if (app.isProductionEnv) {
    options.format = options.format || loggerFormat
    options.filename = options.filename || 'access.log'
    options.stream = options.stream || {
      path: path.join(app.root, 'log'),
      // rotate daily
      interval: '1d'
    }

    return morgan(options.format, {
      stream: rfs(options.filename, options.stream)
    })
  }

  return morgan(options.format || 'dev', options)
}

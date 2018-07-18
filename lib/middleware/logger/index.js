const path = require('path')
const extend = require('extend2')
const rfs = require('rotating-file-stream')
const morgan = require('./morgan')

const loggerFormat = ':real-ip [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'

module.exports = function(app, options={}) {
  if (app.isProduction) {
    options = extend(true, {
      format: loggerFormat,
      filename: 'access.log',
      stream: {
        path: path.join(app.root, 'log'),
        // rotate daily
        interval: '1d'
      }
    }, options)

    return morgan(options.format, {
      stream: rfs(options.filename, options.stream)
    })
  }

  options = extend(true, {
    format: 'dev'
  }, options)

  return morgan(options.format, options)
}

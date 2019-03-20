export default {
  appenders: {
    console: {
      type: 'console'
    },
    error: {
      type: 'file',
      filename: 'log/error.log'
    },
    app: {
      type: 'file',
      filename: 'log/app.log'
    }
  },

  categories: {
    default: { appenders: ['console'], level: 'debug' },
    error: { appenders: ['error'], level: 'error' },
    app: { appenders: ['app'], level: 'info' }
  }
}

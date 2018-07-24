/**
 * middlewares
 * 
 * 统一成传入option返回中间件的格式
 */

module.exports = {
  logger: require('./logger'),
  compress: require('./compress'),
  minify: require('./minify'),
  bodyParser: require('./bodyParser'),
  session: require('./session'),
  csrf: require('./csrf'),
  cors: require('./cors'),
  json: require('./json'),
  static: require('./static'),
  onerror: require('./onerror'),
  render: require('./render'),

  multer: require('./multer')

  // state
  // router
}
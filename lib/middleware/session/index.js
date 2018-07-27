const session = require('koa-session')

session.RedisStore = require('./RedisStore')

module.exports = session
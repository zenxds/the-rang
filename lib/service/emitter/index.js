const EventEmitter = require('events')

/*
 * 单例
 * on/once/emit
 * emitter.emit('event', data)
 * emitter.on('event', function(data) {})
 */
module.exports = new EventEmitter()

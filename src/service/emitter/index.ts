import * as EventEmitter from 'events'

/*
 * 单例
 * on/once/emit
 * emitter.emit('event', data)
 * emitter.on('event', function(data) {})
 */
export const emitter = new EventEmitter()

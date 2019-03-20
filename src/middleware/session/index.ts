import * as session from 'koa-session'
import RedisStore from './RedisStore'

session.RedisStore = RedisStore

export { session }

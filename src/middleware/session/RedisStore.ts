/**
 * redis store for koa-session
 */

interface RedisClient {
  getAsync: (key: string) => Promise<any>
  setAsync: (
    key: string,
    value: string,
    type: string,
    maxAge: number
  ) => Promise<any>
  delAsync: (key: string) => Promise<any>
}

interface RedisStoreOptions {
  client: RedisClient
}

export default class RedisStore {
  client: RedisClient

  constructor(options: RedisStoreOptions) {
    this.client = options.client
  }

  async get(key) {
    const value = await this.client.getAsync(key)
    return JSON.parse(value)
  }

  async set(key, value, maxAge) {
    await this.client.setAsync(key, JSON.stringify(value), 'EX', maxAge / 1000)
  }

  async destroy(key) {
    await this.client.delAsync(key)
  }
}

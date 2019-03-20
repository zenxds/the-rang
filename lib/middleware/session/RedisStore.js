"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RedisStore {
    constructor(options) {
        this.client = options.client;
    }
    async get(key) {
        const value = await this.client.getAsync(key);
        return JSON.parse(value);
    }
    async set(key, value, maxAge) {
        await this.client.setAsync(key, JSON.stringify(value), 'EX', maxAge / 1000);
    }
    async destroy(key) {
        await this.client.delAsync(key);
    }
}
exports.default = RedisStore;
//# sourceMappingURL=RedisStore.js.map
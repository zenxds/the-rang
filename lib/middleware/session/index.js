"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session = require("koa-session");
exports.session = session;
const RedisStore_1 = require("./RedisStore");
session.RedisStore = RedisStore_1.default;
//# sourceMappingURL=index.js.map
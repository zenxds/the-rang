"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extend = require("extend2");
const koaCSRF = require("koa-csrf");
function csrf(options = {}) {
    options = extend(true, {}, options);
    return new koaCSRF(options);
}
exports.csrf = csrf;
//# sourceMappingURL=index.js.map
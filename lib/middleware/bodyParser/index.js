"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extend = require("extend2");
const koaBodyParser = require("koa-bodyparser");
function bodyParser(options = {}) {
    options = extend(true, {
        formLimit: '50mb'
    }, options);
    return koaBodyParser(options);
}
exports.bodyParser = bodyParser;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extend = require("extend2");
const koaCORS = require("@koa/cors");
function cors(options = {}) {
    options = extend(true, {
        credentials: true,
        keepHeadersOnError: true,
        maxAge: 24 * 60 * 60
    }, options);
    return koaCORS(options);
}
exports.cors = cors;
//# sourceMappingURL=index.js.map
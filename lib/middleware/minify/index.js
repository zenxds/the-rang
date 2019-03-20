"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extend = require("extend2");
const html_minifier_1 = require("html-minifier");
function minify(options = {}) {
    options = extend(true, {
        collapseWhitespace: true
    }, options);
    return async function (ctx, next) {
        await next();
        if (!ctx.response.is('html')) {
            return;
        }
        let body = ctx.body;
        if (!body || body.pipe) {
            return;
        }
        if (Buffer.isBuffer(body)) {
            body = body.toString();
        }
        try {
            ctx.body = html_minifier_1.minify(body, options);
        }
        catch (err) { }
    };
}
exports.minify = minify;
//# sourceMappingURL=index.js.map
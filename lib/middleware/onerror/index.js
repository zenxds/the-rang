"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../helper");
function onerror(options = {}) {
    options = helper_1.extend(true, {
        isAPI: ctx => /\/api\//.test(ctx.path)
    }, options);
    return async function (ctx, next) {
        const isAPI = helper_1.isTruthy(options.isAPI, ctx);
        try {
            await next();
            if (isAPI) {
                ctx.body = validateStatus(ctx.status)
                    ? {
                        success: true,
                        data: ctx.body
                    }
                    : {
                        success: false,
                        message: ctx.message
                    };
                return;
            }
        }
        catch (err) {
            if (isAPI) {
                ctx.body = {
                    success: false,
                    message: err.message
                };
                return;
            }
            ctx.status = err.status || 500;
            if (ctx.status === 404) {
                await ctx.render('404', { message: err.message });
            }
            else {
                await ctx.render('500', { err });
                ctx.app.emit('error', err, ctx);
            }
        }
        if (ctx.status === 404 && !ctx.body) {
            await ctx.render('404', { message: ctx.message });
        }
    };
}
exports.onerror = onerror;
function validateStatus(status) {
    return status >= 200 && status < 300;
}
//# sourceMappingURL=index.js.map
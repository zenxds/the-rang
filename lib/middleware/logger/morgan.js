'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const originalMorgan = require("morgan");
originalMorgan.token('real-ip', function (req, res) {
    return req.headers['x-real-ip'];
});
function morgan(format, options) {
    const fn = originalMorgan(format, options);
    return (ctx, next) => {
        return new Promise((resolve, reject) => {
            fn(ctx.req, ctx.res, err => {
                err ? reject(err) : resolve(ctx);
            });
        }).then(next);
    };
}
morgan.compile = originalMorgan.compile;
morgan.format = originalMorgan.format;
morgan.token = originalMorgan.token;
exports.default = morgan;
//# sourceMappingURL=morgan.js.map
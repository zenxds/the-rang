"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = require("async-validator");
const delegate = require("delegates");
class Controller {
    constructor(ctx) {
        this.ctx = ctx || {};
    }
    isGet() {
        return this.method.toUpperCase() === 'GET';
    }
    isPost() {
        return this.method.toUpperCase() === 'POST';
    }
    isMethod(method) {
        return this.method === method.toUpperCase();
    }
    isAjax() {
        return this.get('x-requested-with') === 'XMLHttpRequest';
    }
    getProtocol() {
        return this.get('x-forwarded-proto') || this.protocol;
    }
    validate(descriptor, data) {
        const validator = new schema(descriptor);
        return new Promise((resolve, reject) => {
            validator.validate(data, (errors, fields) => {
                if (errors) {
                    reject({
                        errors,
                        fields
                    });
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.default = Controller;
delegate(Controller.prototype, 'ctx')
    .access('app')
    .access('models')
    .access('services');
delegate(Controller.prototype, 'ctx')
    .method('attachment')
    .method('redirect')
    .method('remove')
    .method('vary')
    .method('set')
    .method('append')
    .method('flushHeaders')
    .access('status')
    .access('message')
    .access('body')
    .access('length')
    .access('type')
    .access('lastModified')
    .access('etag')
    .getter('headerSent')
    .getter('writable');
delegate(Controller.prototype, 'ctx')
    .method('acceptsLanguages')
    .method('acceptsEncodings')
    .method('acceptsCharsets')
    .method('accepts')
    .method('get')
    .method('is')
    .access('querystring')
    .access('idempotent')
    .access('socket')
    .access('search')
    .access('method')
    .access('query')
    .access('path')
    .access('url')
    .access('accept')
    .getter('origin')
    .getter('href')
    .getter('subdomains')
    .getter('protocol')
    .getter('host')
    .getter('hostname')
    .getter('URL')
    .getter('header')
    .getter('headers')
    .getter('secure')
    .getter('stale')
    .getter('fresh')
    .getter('ips')
    .getter('ip');
delegate(Controller.prototype, 'ctx')
    .method('inspect')
    .method('toJSON')
    .method('assert')
    .method('throw')
    .access('request')
    .access('response')
    .access('req')
    .access('res')
    .access('state')
    .access('originalUrl')
    .access('cookies');
delegate(Controller.prototype, 'ctx')
    .access('session')
    .method('render');
//# sourceMappingURL=Base.js.map
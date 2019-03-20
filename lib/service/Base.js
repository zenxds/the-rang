"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delegate = require("delegates");
class Service {
    constructor(ctx) {
        this.ctx = ctx || {};
    }
}
exports.default = Service;
delegate(Service.prototype, 'ctx')
    .access('app')
    .access('models')
    .access('services');
//# sourceMappingURL=Base.js.map
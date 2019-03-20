"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const extend = require("extend2");
exports.extend = extend;
const isType_1 = require("./isType");
__export(require("./isType"));
__export(require("./walk"));
function camelize(str, upperFirst = false) {
    let ret = str.replace(/[-_][^-_]/g, function (match) {
        return match.charAt(1).toUpperCase();
    });
    return upperFirst ? ret.charAt(0).toUpperCase() + ret.substring(1) : ret;
}
exports.camelize = camelize;
function each(object, fn) {
    let length = object.length;
    if (length === +length) {
        for (let i = 0; i < length; i++) {
            if (fn(object[i], i, object) === false) {
                break;
            }
        }
    }
    else {
        for (let i in object) {
            if (object.hasOwnProperty(i) && fn(object[i], i, object) === false) {
                break;
            }
        }
    }
}
exports.each = each;
function isTruthy(v, ...args) {
    if (isType_1.isRegExp(v)) {
        return v.test(args[0]);
    }
    if (isType_1.isFunction(v)) {
        return !!v(...args);
    }
    return !!v;
}
exports.isTruthy = isTruthy;
//# sourceMappingURL=index.js.map
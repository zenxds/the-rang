"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isType = (type) => {
    return (obj) => {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    };
};
exports.isFunction = isType('Function');
exports.isAsyncFunction = isType('AsyncFunction');
exports.isRegExp = isType('RegExp');
exports.isObject = isType('Object');
exports.isPlainObject = (obj) => {
    return exports.isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
};
exports.isExtendsFrom = (Child, Parent) => {
    return exports.isFunction(Child) && Child.prototype instanceof Parent;
};
//# sourceMappingURL=isType.js.map
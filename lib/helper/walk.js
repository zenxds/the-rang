"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const isType_1 = require("./isType");
function walkDir(dir, callback) {
    const ret = {};
    if (!fs.existsSync(dir)) {
        return ret;
    }
    const fn = callback ||
        function (p) {
            return {
                key: path.basename(p, '.js'),
                value: require(p)
            };
        };
    const files = fs.readdirSync(dir);
    for (let file of files) {
        let p = path.join(dir, file);
        let stat = fs.statSync(p);
        if (stat.isFile() && path.extname(p) === '.js') {
            const result = fn(p);
            if (result === false) {
                continue;
            }
            ret[result.key] = result.value;
        }
        else if (stat.isDirectory()) {
            ret[path.basename(p)] = walkDir(p, fn);
        }
    }
    return ret;
}
exports.walkDir = walkDir;
function walkObject(obj, callback) {
    const ret = {};
    if (!isType_1.isPlainObject(obj)) {
        return ret;
    }
    const fn = callback ||
        function (key, value, obj) {
            return {
                key,
                value
            };
        };
    Object.keys(obj).forEach(key => {
        let value = obj[key];
        if (isType_1.isPlainObject(value)) {
            ret[key] = walkObject(value, fn);
        }
        else {
            const result = fn(key, value, ret);
            if (result === false) {
                return;
            }
            ret[result.key] = result.value;
        }
    });
    return ret;
}
exports.walkObject = walkObject;
//# sourceMappingURL=walk.js.map
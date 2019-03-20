"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const rotating_file_stream_1 = require("rotating-file-stream");
const morgan_1 = require("./morgan");
const loggerFormat = ':real-ip [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
function logger(app, options = {}) {
    if (app.isProductionEnv) {
        options.format = options.format || loggerFormat;
        options.filename = options.filename || 'access.log';
        options.stream = options.stream || {
            path: path.join(app.root, 'log'),
            interval: '1d'
        };
        return morgan_1.default(options.format, {
            stream: rotating_file_stream_1.default(options.filename, options.stream)
        });
    }
    return morgan_1.default(options.format || 'dev', options);
}
exports.logger = logger;
//# sourceMappingURL=index.js.map
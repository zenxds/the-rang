"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const nunjucks = require("nunjucks");
const koaViews = require("koa-views");
const helper_1 = require("../../helper");
const filters_1 = require("./filters");
function render(app, options = {}) {
    options = helper_1.extend(true, {
        root: path.join(app.root, 'app/view')
    }, options);
    options.filters = helper_1.extend(true, {}, filters_1.default, options.filters || {});
    const rootPath = options.root;
    const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(rootPath));
    helper_1.each(options.filters, (filter, key) => {
        env.addFilter(key, filter);
    });
    return koaViews(rootPath, {
        map: {
            html: 'nunjucks'
        },
        extension: 'html',
        options: {
            nunjucksEnv: env
        }
    });
}
exports.render = render;
//# sourceMappingURL=index.js.map
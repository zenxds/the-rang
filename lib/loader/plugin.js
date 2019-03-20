"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../helper");
class PluginLoader {
    constructor(options) {
        this.app = options.app;
        this.plugins = options.plugins || {};
        this.services = {};
        this.middlewares = {};
        helper_1.each(this.plugins, (plugin, name) => {
            if (plugin.enable) {
                this.load(name, plugin.package, plugin.options);
            }
        });
    }
    load(name, pkg = `the-rang-${name}`, options) {
        const plugin = require(pkg)(options, this.app);
        this.extendApplication(plugin.application);
        this.extendContext(plugin.context);
        this.extendRequest(plugin.request);
        this.extendResponse(plugin.response);
        this.registerService(name, plugin.service);
        this.registerMiddleware(name, plugin.middleware);
    }
    extendApplication(obj) {
        if (!obj) {
            return;
        }
        helper_1.extend(this.app, obj);
    }
    extendContext(obj) {
        if (!obj) {
            return;
        }
        helper_1.extend(this.app.context, obj);
    }
    extendRequest(obj) {
        if (!obj) {
            return;
        }
        helper_1.extend(this.app.request, obj);
    }
    extendResponse(obj) {
        if (!obj) {
            return;
        }
        helper_1.extend(this.app.response, obj);
    }
    registerMiddleware(name, middleware) {
        if (!middleware) {
            return;
        }
        helper_1.extend(this.middlewares, {
            [helper_1.camelize(name)]: middleware
        });
    }
    registerService(name, service) {
        if (!service) {
            return;
        }
        helper_1.extend(this.services, {
            [helper_1.camelize(name)]: service
        });
    }
}
exports.default = PluginLoader;
//# sourceMappingURL=plugin.js.map
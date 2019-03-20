"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const log4js = require("log4js");
const delegate = require("delegates");
const sequelize_1 = require("sequelize");
const Base_1 = require("./controller/Base");
const Base_2 = require("./service/Base");
const middlewares = require("./middleware");
const services = require("./service");
const plugin_1 = require("./loader/plugin");
const helper_1 = require("./helper");
class Application extends Koa {
    constructor(options) {
        super();
        this.options = options;
        this.keys = options.keys;
        this.root = options.root || process.cwd();
        this.isProductionEnv = /^(prod|production)$/.test(this.env);
        this.pluginLoader = new plugin_1.default({
            app: this,
            plugins: options.plugins
        });
        this.initMiddlewares();
        this.initControllers();
        this.initModels();
        this.initServices();
        this.initLogger();
    }
    initMiddlewares() {
        this.middlewares = helper_1.extend({}, middlewares, this.pluginLoader.middlewares, this.walkDir('app/middleware'));
    }
    initControllers() {
        this.controllers = this.walkDir('app/controller', this.controllerCallback);
    }
    initModels() {
        const db = this.options.db;
        if (!db) {
            return;
        }
        const sequelize = new sequelize_1.Sequelize(db.database, db.username, db.password, {
            host: db.host,
            port: db.port,
            dialect: db.dialect,
            logging: this.isProductionEnv ? false : console.log
        });
        const models = {};
        this.walkDir('app/model', (p) => {
            const model = sequelize.import(p);
            models[helper_1.camelize(model.name, true)] = model;
            return false;
        });
        Object.keys(models).forEach(modelName => {
            if (models[modelName].associate) {
                models[modelName].associate(models);
            }
        });
        sequelize
            .authenticate()
            .then(() => {
            console.log('Connection has been established successfully');
        })
            .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
        this.sequelize = sequelize;
        this.models = models;
        delegate(this.context, 'app').access('models');
    }
    initServices() {
        this.services = helper_1.extend({}, services, this.pluginLoader.services, this.walkDir('app/service'));
    }
    initLogger() {
        const loggerConfigFile = this.resolve('config/log4js/index.js');
        const loggerConfig = fs.existsSync(loggerConfigFile)
            ? require(loggerConfigFile)
            : require('./config/log4js').default;
        log4js.configure(loggerConfig);
        helper_1.each(loggerConfig.categories, (v, k) => {
            const loggerName = k + 'Logger';
            this[loggerName] = log4js.getLogger(k);
            delegate(this.context, 'app').access(loggerName);
        });
    }
    initContextServices(ctx) {
        ctx.services = helper_1.walkObject(this.services, (key, value, obj) => {
            if (helper_1.isExtendsFrom(value, Base_2.default)) {
                return {
                    key,
                    value: new Proxy(value.prototype, {
                        get: function (obj, prop) {
                            const service = new value(ctx);
                            if (helper_1.isAsyncFunction(service[prop]) ||
                                helper_1.isFunction(service[prop])) {
                                return service[prop]();
                            }
                            return service[prop];
                        }
                    })
                };
            }
            return {
                key,
                value
            };
        });
    }
    createContext(req, res) {
        const ctx = super.createContext(req, res);
        this.initContextServices(ctx);
        return ctx;
    }
    controllerCallback(p) {
        const basename = path.basename(p, '.js');
        const Controller = require(p);
        const ret = {
            key: basename,
            value: Controller
        };
        if (!helper_1.isExtendsFrom(Controller, Base_1.default)) {
            return ret;
        }
        return {
            key: basename,
            value: new Proxy(Controller.prototype, {
                get: function (obj, prop) {
                    return async function (ctx, next) {
                        const controller = new Controller(ctx);
                        if (helper_1.isAsyncFunction(controller[prop])) {
                            return controller[prop](next);
                        }
                        if (helper_1.isFunction(controller[prop])) {
                            console.warn(`Controller ${p}: method ${String(prop)} should be async function`);
                            return controller[prop](next);
                        }
                    };
                }
            })
        };
    }
    walkDir(dir, callback) {
        return helper_1.walkDir(this.resolve(dir), callback);
    }
    resolve(dir) {
        return path.resolve(this.root, dir);
    }
}
exports.default = Application;
//# sourceMappingURL=Application.js.map
# the rang

a simple wrapper for Koa

```
Application: 在Koa Application基础上做了少许扩展
Controller: controller基类
Service: service基类
Router: 在koa-router基础上做了少许定制
services: 内置service
middlewares: 内置middleware
decorators: 内置decorator，暂时没有使用
helpers: helper方法
```

## middleware

* logger
* compress
* minify
* bodyParser
* session
* csrf
* cors
* json
* static
* onerror
* render

## services

* emitter
* Cache

## plugins

框架扩展机制

* [the-rang-ding-crop](https://www.npmjs.com/package/the-rang-ding-crop)
* [the-rang-weixin](https://www.npmjs.com/package/the-rang-weixin)
* [the-rang-mail](https://www.npmjs.com/package/the-rang-mail)
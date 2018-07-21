const KoaRouter = require('koa-router')
const compose = require('koa-compose')

class Router extends KoaRouter {}

/**
 * 重写koa-router的routes逻辑
 * https://github.com/alexmingoia/koa-router/blob/master/lib/router.js#L314
 */
Router.prototype.routes = Router.prototype.middleware = function () {
  var router = this

  var dispatch = function dispatch(ctx, next) {
    var path = router.opts.routerPath || ctx.routerPath || ctx.path
    var matched = router.match(path, ctx.method)
    var layerChain, layer, i

    if (ctx.matched) {
      ctx.matched.push.apply(ctx.matched, matched.path)
    } else {
      ctx.matched = matched.path
    }

    ctx.router = router

    if (!matched.route) return next()

    var matchedLayers = matched.pathAndMethod
    var mostSpecificLayer = matchedLayers[matchedLayers.length - 1]
    ctx._matchedRoute = mostSpecificLayer.path
    if (mostSpecificLayer.name) {
      ctx._matchedRouteName = mostSpecificLayer.name
    }

    layerChain = matchedLayers.reduce(function(memo, layer) {
      memo.push(function(ctx, next) {
        ctx.captures = layer.captures(path, ctx.captures)
        ctx.params = layer.params(path, ctx.captures, ctx.params)
        ctx.routerName = layer.name
        return next()
      })
      return memo.concat(layer.stack)
    }, [])

    /**
     * 只有这段代码是新加的
     * 遍历layerChain找到之前的占位action并用实际的替换掉
     */
    layerChain = layerChain.map(item => {
      if (item.Controller && item.Action) {
        const controller = new item.Controller(ctx)
        return controller[item.Action].bind(controller)
      }

      return item
    })

    return compose(layerChain)(ctx, next)
  }

  dispatch.router = this

  return dispatch
}

module.exports = Router
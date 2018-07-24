const { Router } = require('../../../lib')

module.exports = function(app) {
  const router = new Router()

  router.get('/', app.controllers.blog.index, app.controllers.blog.index2, app.controllers.blog.index3)
  router.get('/home', app.controllers.home.index)

  return router
}
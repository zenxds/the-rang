const path = require('path')
const { Application, middlewares } = require('../lib')

const app = new Application({
  keys: ['58f9014fb686fe9b6449f1769e37ec90a676e9c6']
})

app.use(middlewares.logger(app))
app.use(middlewares.compress())
app.use(middlewares.minify())
// 放在csrf之前
app.use(middlewares.bodyParser())
app.use(middlewares.session(app))
app.use(middlewares.csrf())
app.use(middlewares.cors())
app.use(middlewares.json())
app.use(middlewares.static(path.join(app.root, 'app/public'), {
  maxage: app.isProduction ? 1000 * 3600 * 24 : 0
}))
// 返回的时候在json化之前
app.use(middlewares.onerror())
app.use(middlewares.render(app))

app.listen(7005, function() {
  console.log(`server is running on port ${this.address().port}`)
})
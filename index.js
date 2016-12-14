global.Promise = require('bluebird')
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const router = require('./server/routes/index.js')

const run = require('./docker')
run('2770')

const app = new Koa()

app.use(bodyparser())

app.use(router.routes())
   .use(router.allowedMethods())

app.listen(8000)

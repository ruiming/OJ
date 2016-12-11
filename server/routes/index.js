const Router = require('koa-router')
const ProblemRoute = require('./problemRoute')

const api = new Router({
    prefix: '/api'
})

api.use('/problem', ProblemRoute.routes(), ProblemRoute.allowedMethods())

module.exports = api

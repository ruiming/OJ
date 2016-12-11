const Router = require('koa-router')
const ProblemController = require('../controllers/problemController')

const router = new Router()

router.post('/', ProblemController.check)

module.exports = router

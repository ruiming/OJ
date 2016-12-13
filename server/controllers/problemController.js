const Problems = require('../db/problems')
const fs = Promise.promisifyAll(require('fs-extra'))
const path = require('path')
const config = require('../../config')


module.exports.check = async (ctx, next) => {
    let { problemId, code } = ctx.request.body
    await fs.outputFileAsync(path.resolve(config.OUTPUT.CPP, `${problemId}.${Date.now()}.cpp`), code)
}

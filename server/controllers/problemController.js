const Problems = require('../db/problems')
const fs = Promise.promisifyAll(require('fs-extra'))
const path = require('path')
const config = require('../../config')


module.exports.check = async (ctx, next) => {
    let { problemId, code } = ctx.request.body
    // 将用户代码和对应测试文件存入临时文件夹
    await Promise.all([
        fs.outputFileAsync(path.resolve(config.OUTPUT.CPP, `${problemId}.${Date.now()}.cpp`), code),
        fs.copy(path.resolve(config.DIR.QUESTIONS, `${problemId}.in`), path.resolve(config.OUTPUT.CPP, `${problemId}.in`))
    ])
}

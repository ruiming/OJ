const fs = Promise.promisifyAll(require('fs-extra'))
const { execFile } = require('child_process')
const path = require('path')
const Problems = require('../db/problems')
const config = require('../../config')
const check = require('../../docker')

module.exports.check = async (ctx, next) => {
    let { problemId, code } = ctx.request.body,
        date = Date.now()
    await fs.ensureDirAsync(config.SRC.CPP)
    let cpp  = path.resolve(config.SRC.CPP, `${problemId}${date}.cpp`),
        out  = path.resolve(config.SRC.CPP, `${problemId}${date}`),
        test = path.resolve(config.SRC.CPP, `${problemId}${date}.in`)
    // 将用户代码和对应测试文件存入临时文件夹
    await Promise.all([
        fs.outputFileAsync(cpp, code),
        fs.copy(path.resolve(config.DIR.TESTS, `${problemId}.in`), test)
    ])
    // 编译代码
    await new Promise((resolve, reject) => {
        execFile('g++', [`${cpp}`, '-o', `${out}`], async (err, stdout, stderr) => {
            if (err || stderr) {
                console.log(err || stderr)
                // TODO: 全局处理错误
                ctx.status = 400
                ctx.body = {
                    success: false,
                    message: stderr || err
                }
                reject(err || stderr)
            } else {
                await check(path.basename(cpp, '.cpp'))
                resolve()
            }
        })
    })
}

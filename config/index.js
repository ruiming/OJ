const fs = Promise.promisifyAll(require('fs-extra'))
const path = require('path')

module.exports = {
    // 项目文件夹
    DIR: {
        TESTS: path.resolve(__dirname, '..', 'tests'),
    },
    // 用户代码存放文件夹
    SRC: {
        CPP: path.resolve(__dirname, '..', 'temp')
    }
}

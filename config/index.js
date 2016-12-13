const fs = Promise.promisifyAll(require('fs-extra'))
const path = require('path')

module.exports = {
    DIR: {
        QUESTIONS: path.resolve(__dirname, '..', 'tests')
    },
    OUTPUT: {
        CPP: path.resolve(__dirname, '..', 'temp')
    }
}

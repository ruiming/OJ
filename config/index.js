const fs = Promise.promisifyAll(require('fs-extra'))
const path = require('path')

module.exports = {
    OUTPUT: {
        CPP: path.resolve(__dirname, '..', 'temp')
    }
}

const mongoose = require('mongoose')

const Problems = new mongoose.Schema({
    title:        {type: String},   // 标题
    description:  {type: String},   // 题目描述
    input:        {type: String},   // 输入描述
    output:       {type: String},   // 输出描述
    sampleInput:  {type: String},   // 样例输入
    sampleOutput: {type: String},   // 样例输出
    inputData:    {type: String},   // 测试输入文件
    outputData:   {type: String}    // 测试输出答案
})

module.exports = Problems

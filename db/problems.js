const mongoose = require('mongoose')

const Problem = new mongoose.Schema({
    title:        {type: String},
    description:  {type: String},
    input:        {type: String},
    output:       {type: String},
    sampleInput:  {type: String},
    sampleOutput: {type: String},
    inputData:    {type: String},
    outputData:   {type: String}
})
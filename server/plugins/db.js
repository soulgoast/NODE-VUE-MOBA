module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://129.211.76.108:27017/node-vue-moba',{
        useNewUrlParser: true
    })
}
const mongooes = require('mongoose')

const schema = new mongooes.Schema({
    name: { type : String},
    parent: {type : mongooes.SchemaTypes.ObjectId, ref: 'Category'}
})

module.exports = mongooes.model('Category', schema)
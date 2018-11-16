var mongoose = require('mongoose')

var shortenSchema = mongoose.Schema({
  original: String,
  code: Number
})

module.exports = mongoose.model('urlDB', shortenSchema)

const mongoose = require('mongoose')

const Book = mongoose.model('Book', {
  user: String,
  name: String,
  pages: Number,
  caps: Number
})

module.exports = Book
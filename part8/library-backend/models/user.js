const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    mingLength: 3
  },
  favoriteGenre: String
})

mongoose.plugin(uniqueValidator)

module.exports = mongoose.model('LibraryUser', schema)
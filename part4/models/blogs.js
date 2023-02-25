const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const config = require('../utils/config')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)

mongoose.connect(config.MONGODB_URI)
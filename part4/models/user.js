const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const config = require('../utils/config')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  pswHash: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Users', userSchema)

mongoose.connect(config.MONGODB_URI)
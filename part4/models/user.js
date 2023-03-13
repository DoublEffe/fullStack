const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const uniqueValidator = require('mongoose-unique-validator')
const config = require('../utils/config')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  name: {
    type: String,
    required: true
  },
  pswHash: String,
  blogs:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.pswHash
  }
})

module.exports = mongoose.model('Users', userSchema)

mongoose.connect(config.MONGODB_URI)
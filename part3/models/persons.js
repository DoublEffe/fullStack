const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url=process.env.MONGODB_URI
//const url='mongodb+srv://fabio:qcfbFVMQjI2pvCiE@phonebook.rrxtpvp.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url)

const personsSchema = new mongoose.Schema({
    
    name: String,
    number: String
})

personsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports=mongoose.model('Pesrons',personsSchema)
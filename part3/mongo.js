const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fabio:${password}@phonebook.rrxtpvp.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const pesronsSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Persons = mongoose.model('Pesrons',pesronsSchema)

if(process.argv.length===3){
    Persons.find({}).then(result=>{
        console.log('phonebook:')
        result.forEach(person=>{
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
else{
const persons = new Persons({
    name: process.argv[3],
    number: process.argv[4]
})

persons.save().then(result=>{
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
})}
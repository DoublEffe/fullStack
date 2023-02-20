require('dotenv').config()
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('body',(req,res)=>JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]





const Persons = require('./models/persons')

app.get('/api/persons',(request, response) => {
  Persons.find({}).then(persons=>{
    response.json(persons)})
  })

app.get('/api/persons/:id',(request,response)=>{
  let person=Persons.findById(request.params.id)
  if(person){
    person.then(person=>response.json(person))
  }
  else{
    response.status(404).end()
  }
})  

app.get('/info',(request,response) =>{
  Persons.find({}).then(persons=>{
    response.send(`<div>
                    <p>Phonebook has info for ${persons.length} people</p>
                    <p>${Date()}</p>
                  </div>`)})
})

app.post('/api/persons',(request,response)=>{
  let id =Math.floor(Math.random() * (100 - 4 + 1) + 4)
  let body=request.body
  if(!body.name || !body.number){
    return response.status(400).json({
      error:'name or number missing'
    })
  }
  
  const persons = new Persons({
    
    "name":body.name,
    "number":body.number
  })
  persons.save().then(result=>{
    response.json(result)
    mongoose.connection.close()
  })
  
  
})


app.delete('/api/persons/:id',(request,response)=>{
  
  Persons.deleteOne({_id:request.params.id}).then(result=>console.log(result))
  
  response.status(204).end()
})

const PORT = process.env.PORT||3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
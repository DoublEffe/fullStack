const { response } = require('express')
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
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

app.get('/api/persons',(request, response) => {
    response.json(persons)
  })

app.get('/api/persons/:id',(request,response)=>{
  let id=Number(request.params.id)
  let person=persons.find(person=>person.id===id)
  if(person){
    response.json(person)
    }
    else{
      response.status(404).end()
    }
})  

app.get('/info',(request,response) =>{
  response.send(`<div>
                  <p>Phonebook has info for ${persons.length} people</p>
                  <p>${Date()}</p>
                </div>`)
})

app.post('/api/persons',(request,response)=>{
  let id =Math.floor(Math.random() * (100 - 4 + 1) + 4)
  let body=request.body
  if(!body.name || !body.number){
    return response.status(400).json({
      error:'name or number missing'
    })
  }
  if(persons.find(person=>person.name === body.name)){
    return response.status(400).json({
      error:'name must be unique'
    })
  }
  let person={
    "id":id,
    "name":body.name,
    "number":body.number
  }
  persons=persons.concat(person)
  response.json(person)
  console.log(Object.prototype.toString(body))
  morgan.token('body',()=>JSON.stringify(body))
 
})


app.delete('/api/persons/:id',(request,response)=>{
  let id=Number(request.params.id)
  persons=persons.filter(person=>person.id!==id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
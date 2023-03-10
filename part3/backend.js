require('dotenv').config()


const express = require ('express')

const morgan = require('morgan')

const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('body',(req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))






const Persons = require('./models/persons')

app.get('/api/persons',(request, response) => {
  Persons.find({}).then(persons => {
    response.json(persons)})
}
)

app.get('/api/persons/:id',(request,response,next) => {
  Persons.findById(request.params.id).then(person => {
    if(person){
      response.json(person)
    }
    else{
      response.status(404).end()
    }})
    .catch(error => next(error))
}
)


app.get('/info',(request,response) => {
  Persons.find({}).then(persons => {
    response.send(`<div>
                    <p>Phonebook has info for ${persons.length} people</p>
                    <p>${Date()}</p>
                  </div>`)})
})

app.post('/api/persons',(request,response,next) => {
  let body=request.body
  if(!body.name || !body.number){
    return response.status(400).json({
      error:'name or number missing'
    })
  }
  const persons = new Persons({
    'name':body.name,
    'number':body.number
  })
  persons.save().then(result => {
    response.json(result)
  })
    .catch(error => next(error))
})


app.delete('/api/persons/:id',(request,response,next) => {
  Persons.deleteOne({ _id:request.params.id }).then(() => response.status(204).end())
    .catch(error => next(error))
})

app.put('/api/persons/:id',(request,response,next) => {
  let { name,number }=request.body
  Persons.findByIdAndUpdate(request.params.id,{ name,number },{ new:true, runValidators: true, context: 'query' })
    .then(personupdated => response.json(personupdated))
    .catch(error => next(error))
})

const errorhandler = (error,request,response,next) => {
  console.log(error)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorhandler)


const PORT = process.env.PORT||3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
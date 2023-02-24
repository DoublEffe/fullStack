require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')


const Blog = require('./models/blogs')
//const mongoUrl = 'mongodb+srv://fabio:MbC6TTaX3q62c9qi@cluster0.jonu63n.mongodb.net/?retryWrites=true&w=majority'



app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
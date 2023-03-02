const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../bloglist')

const api = supertest(app)

test.only('blogs returned as json',async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
},100000)

afterAll(async () => {
  await mongoose.connection.close()
})
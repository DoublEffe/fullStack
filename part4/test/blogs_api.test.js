const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../bloglist')
const Blogs = require('../models/blogs')

const api = supertest(app)
const initialBlogs = [
  {
    title: 'prova',
    author: 'fabio',
    url: 'http://prova',
    likes: 2
  },
  {
    title: 'prova1',
    author: 'fabio1',
    url: 'http://prova1',
    likes: 4
  }
]
beforeEach(async () => {
  await Blogs.deleteMany({})
  const blogInDb = initialBlogs.map(blog => new Blogs(blog))
  const promise = blogInDb.map(blog => blog.save())
  await Promise.all(promise)
})

test('blogs returned as json',async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)

},100000)

test('return all blogs',async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
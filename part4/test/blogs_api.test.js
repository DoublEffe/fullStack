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

test('id format',async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog =>
    expect(blog._id).not.toBeDefined())
})

test.only('post a blog',async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

  const response = await api.get('/api/blogs')
  const urls = response.body.map(blog => blog.url)

  expect(response.body).toHaveLength(initialBlogs.length +1)
  expect(urls).toContain('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
})

afterAll(async () => {
  await mongoose.connection.close()
})
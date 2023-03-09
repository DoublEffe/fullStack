const mongoose = require('mongoose')
const supertest = require('supertest')
//const { response } = require('../bloglist')
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

test('post a blog',async () => {
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

test('likes default to 0',async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const response = await api.get('/api/blogs')
  expect(response.body[2]).toEqual(expect.objectContaining({ likes: 0 }))
})

test('title or  url missing',async () => {
  const newBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
    },
    {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
    }
  ]

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('deleting a blog',async () => {
  const response = await api.get('/api/blogs')
  await api
    .delete(`/api/blogs/${ response.body[0].id }`)
    .expect(204)
  const afterDel = await api.get('/api/blogs')
  const blogsurl = afterDel.body.map(blog => blog.url)

  expect(afterDel.body).toHaveLength(initialBlogs.length -1)
  expect(blogsurl).not.toContain(response.body[0].url)

})

test.only('updating a blog',async () => {
  const toUpdate = {
    title: 'prova3',
    author: 'fabio',
    url: 'http://prova',
    likes: 20
  }
  const response = await api.get('/api/blogs')

  await api
    .put(`/api/blogs/${ response.body[0].id }`)
    .send(toUpdate)
    .expect(204)

  const afterUpdate = await api.get('/api/blogs')
  expect(afterUpdate.body[0].title).toBe('prova3')
  expect(afterUpdate.body[0].likes).toBe(20)
})

afterAll(async () => {
  await mongoose.connection.close()
})
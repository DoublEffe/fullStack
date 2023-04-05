const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../bloglist')
const Blogs = require('../models/blogs')

const api = supertest(app)
const initialUser = {
  username: 'fabio',
  password: '1234',
}
let tokenReq = ''
const initialBlogs = [
  {
    title: 'prova',
    author: 'fabio',
    url: 'http://prova',
    likes: 2,
    user: '64120b3f34b0a8035502d476'
  },
  {
    title: 'prova1',
    author: 'fabio1',
    url: 'http://prova1',
    likes: 5,
    user: '64120b3f34b0a8035502d476'
  }
]
beforeEach(async () => {
  await Blogs.deleteMany({})
  const blogInDb = initialBlogs.map(blog => new Blogs(blog))
  const promise = blogInDb.map(blog => blog.save())
  await Promise.all(promise)
  tokenReq = await api.post('/api/login').send(initialUser)
})

describe('check for blogs existance and format',() => {
  test('blogs returned as json',async() => {

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type',/application\/json/)
  })

  test('return all blogs',async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('id format',async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog =>
      expect(blog._id).not.toBeDefined())
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
      .set({ Authorization:'Bearer '+ tokenReq.body.token })
      .send(newBlog)
      .expect(400)
  })

  test('likes default to 0',async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    await api
      .post('/api/blogs')
      .set({ Authorization:'Bearer '+ tokenReq.body.token })
      .send(newBlog)

    const response = await api.get('/api/blogs')
    expect(response.body[2]).toEqual(expect.objectContaining({ likes: 0 }))
  })
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
    .set({ Authorization:'Bearer '+ tokenReq.body.token })
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

  const response = await api.get('/api/blogs')
  const urls = response.body.map(blog => blog.url)

  expect(response.body).toHaveLength(initialBlogs.length +1)
  expect(urls).toContain('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
})

test('missing auth',async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization:'Bearer ciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhYmlvMzI1IiwiaWQiOiI2NDEwYjQzMDMyNmIxNjg2ZDJhMGI2YWYiLCJpYXQiOjE2Nzg4NzEyNTN9.axVrqmV6PwzgARLMauLHpVgDj-gJ9H-mgIGbiI0-wZM' })
    .expect(401)
})

test('deleting a blog',async () => {
  const response = await api.get('/api/blogs')
  await api
    .delete(`/api/blogs/${ response.body[0].id }`)
    .set({ Authorization:'Bearer '+ tokenReq.body.token })
    .expect(204)
  const afterDel = await api.get('/api/blogs')
  const blogsurl = afterDel.body.map(blog => blog.url)

  expect(afterDel.body).toHaveLength(initialBlogs.length -1)
  expect(blogsurl).not.toContain(response.body[0].url)

})

test('updating a blog',async () => {
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
    .expect(200)

  const afterUpdate = await api.get('/api/blogs')
  expect(afterUpdate.body[0].title).toBe('prova3')
  expect(afterUpdate.body[0].likes).toBe(20)
})

afterAll(async () => {
  await mongoose.connection.close()
})
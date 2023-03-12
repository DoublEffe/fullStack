const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../bloglist')

const api = supertest(app)
const testPost = (newUser) => api.post('/api/users').send(newUser)

test('missing username',async () => {
  const newUser = {
    name: 'fa',
    password: '1234'
  }

  await testPost(newUser).expect(400)
  expect((await testPost(newUser)).text).toMatch('Users validation failed: username: Path `username` is required')
})

test('missing password',async () => {
  const newUser = {
    username: 'fabio',
    name: 'fa',
  }

  await testPost(newUser).expect(400)

  expect((await testPost(newUser)).text).toMatch('{"error":"password missing or too short"}')
})

test('too short username',async () => {
  const newUser = {
    username: 'fa',
    name: 'fa',
    password: '1234'
  }

  await testPost(newUser).expect(400)

  expect((await testPost(newUser)).text).toMatch('Users validation failed: username: Path `username` (`fa`) is shorter than the minimum allowed length (3)')
})

test('too short password',async () => {
  const newUser = {
    username: 'fabio',
    name: 'fa',
    password: '12'
  }

  await testPost(newUser).expect(400)

  expect((await testPost(newUser)).text).toMatch('{"error":"password missing or too short"}')
})

test('unique username',async () => {
  const newUser = {
    username: 'fabio',
    name: 'fa',
    password: '1234'
  }

  await testPost(newUser).expect(400)

  expect((await testPost(newUser)).text).toMatch('Users validation failed: username: Error, expected `username` to be unique. Value: `fabio`')
})

afterAll(async () => {
  await mongoose.connection.close()
})
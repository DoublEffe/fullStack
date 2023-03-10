const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../bloglist')
const Users = require('../models/user')

const api = supertest(app)

test('missing username',async () => {
  const newUser = {
    name: 'fa',
    password: '1234'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(401)
})

test('missing password',async () => {
  const newUser = {
    username: 'fabio',
    name: 'fa',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(401)
})

test('too short username',async () => {
  const newUser = {
    username: 'fa',
    name: 'fa',
    password: '1234'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(401)
})

test('too short password',async () => {
  const newUser = {
    username: 'fabio',
    name: 'fa',
    password: '12'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(401)
})

test.only('unique username',async () => {
  const correctUser = {
    username: 'fabio',
    name: 'fa',
    password: '1234'
  }
  const newUser = {
    username: 'fabio',
    name: 'fa',
    password: '1234'
  }

  await api
    .post('/api/users')
    .send(correctUser)
    .expect(201)

  await api
    .post('/api/users')
    .send(newUser)
    .expect(401)
})

afterAll(async () => {
  await mongoose.connection.close()
})
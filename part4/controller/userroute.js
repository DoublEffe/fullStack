const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Users = require('../models/user')

usersRouter.get('/',async (request,response) => {
  const users = await Users.find({})
  response.json(users)
})

usersRouter.post('/',async (request,response) => {
  const { username,name,password } = request.body
  if(password === undefined || password.length < 3){
    return response.status(401).end()
  }
  const pwdHash = bcrypt.hash(password,10)

  const user = new Users({
    username,
    name,
    pwdHash
  })

  const userSaved = await user.save()
  response.status(201).json(userSaved)

})

module.exports = usersRouter
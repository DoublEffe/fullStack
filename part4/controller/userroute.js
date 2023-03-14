const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Users = require('../models/user')


usersRouter.get('/',async (request,response) => {
  const users = await Users.find({}).populate('blogs',{ title:1,author:1,url:1 })
  response.json(users)
})

usersRouter.post('/',async (request,response) => {
  const { username,name,password } = request.body
  if(password === undefined || password.length < 3){
    throw new Error('password missing or too short')
  }
  const pswHash = await bcrypt.hash(password,10)

  const user = new Users({
    username,
    name,
    pswHash
  })

  const userSaved = await user.save()
  response.status(201).json(userSaved)

})

module.exports = usersRouter
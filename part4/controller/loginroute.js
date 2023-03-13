const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Users = require('../models/user')

loginRouter.post('/',async (request,response) => {
  const { username,password } = request.body

  const user = await Users.findOne({ username })
  const pwdCorrect = user === null
    ? false
    : await bcrypt.compare(password,user.pswHash)

  if(!(user && pwdCorrect)){
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userToken = {
    username: user.username,
    id: user._id
  }

  // eslint-disable-next-line no-undef
  const token = jwt.sign(userToken, process.env.SECRET)

  response
    .status(200)
    .send({ token,username: user.username,name: user.name })
})

module.exports = loginRouter
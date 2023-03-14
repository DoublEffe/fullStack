const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const Users = require('../models/user')
const jwt = require('jsonwebtoken')
/*
const getToken = request => {
  const auth = request.get('authorization')
  if (auth && auth.startsWith('Bearer ')){
    return auth.replace('Bearer ','')
  }
  return null
}
*/

blogsRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username:1,name:1 })
  response.json(blogs)
})

blogsRouter.post('/',async (request, response) => {
  const body = request.body
  // eslint-disable-next-line no-undef
  const token = jwt.verify(request.token,process.env.SECRET)
  if(!(token.id)){
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await Users.findById(token.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  try{
    const blogSaved = await blog.save()
    user.blogs = user.blogs.concat(blogSaved._id)
    await user.save()
    response.status(201).json(blogSaved)
  }
  catch{
    response.status(400).end()
  }
})

blogsRouter.delete('/:id',async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id',async (request,response) => {
  let { title,author,url,likes } = request.body
  await Blog.findByIdAndUpdate(request.params.id,{ title,author,url,likes },{ new:true, runValidators: true, context: 'query' })
  response.status(204).end()
})

module.exports = blogsRouter
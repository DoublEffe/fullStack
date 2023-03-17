const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const middleware = require('../utils/middleware')

blogsRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username:1,name:1 })
  response.json(blogs)
})

blogsRouter.post('/',middleware.getUser,async (request, response) => {
  const body = request.body
  const user = request.user

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

blogsRouter.delete('/:id',middleware.getUser,async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() === request.user.id){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else{
    return response.status(401).json({ error: 'user don\'t have authorization' })
  }
})

blogsRouter.put('/:id',async (request,response) => {
  let { title,author,url,likes } = request.body
  await Blog.findByIdAndUpdate(request.params.id,{ title,author,url,likes },{ new:true, runValidators: true, context: 'query' })
  response.status(204).end()
})

module.exports = blogsRouter
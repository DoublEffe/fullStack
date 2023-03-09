const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')


blogsRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/',async (request, response) => {
  const blog = new Blog(request.body)
  try{
    const blogSaved = await blog.save()
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
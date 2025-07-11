const Blog = require('../models/blog')

const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const listOfBlogs = await Blog.find({})
  return response.json(listOfBlogs)
})

/*
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})
*/

module.exports = blogsRouter